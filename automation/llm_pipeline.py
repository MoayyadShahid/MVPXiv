"""
LLM pipeline: send arXiv papers to OpenRouter, get structured startup blueprints.
4-model fallback chain. Strict JSON output with repair pass.
"""

from __future__ import annotations

import json
import time
from typing import Any

import httpx

from automation.ingest_arxiv import ArxivPaper

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

FALLBACK_MODELS = [
    "deepseek/deepseek-v3.2",
    "minimax/minimax-m2.5",
]

MAX_REPAIR_ATTEMPTS = 2

MASTER_INSTRUCTION = """Role: You are a Senior AI Architect and a Lead Hiring Manager at a top-tier startup (like Anthropic, OpenAI, or Vercel). Your goal is to identify cutting-edge research and translate it into "Startup-Grade" engineering projects.

Task: Analyze the provided list of the newest Arxiv papers (titles + abstracts + links). Select 5-10 papers that have the highest potential for real-world application or represent a significant technical breakthrough that a Software Engineer (SWE) or Machine Learning Engineer (MLE) can implement as a standout resume project.

For each selected paper, generate a project blueprint with the following sections:

Project Title & Concept: A catchy, "startup-style" name and a 2-sentence value proposition.

Technical Core (The "Hard" Part): Explain exactly which technical mechanism from the paper needs to be implemented (e.g., a specific attention modification, a new RAG retrieval strategy, or a novel loss function). This must be the "wow factor" on a resume.

Startup-Level Implementation: How should this be built to look professional? (e.g., "Build a distributed crawler using Ray," "Implement a low-latency FastAPI endpoint with Redis caching," or "Create a real-time monitoring dashboard with Prometheus").

Modern Tech Stack: List specific, 2026-relevant tools (e.g., PyTorch, LangGraph, Qdrant, Modal for serverless GPU, or ONNX for edge deployment).

Resume "Impact" Bullets: Provide 3 bullet points written in the "Action-Context-Result" format that the user can adapt for their resume (e.g., "Reduced inference latency by 40% by implementing the [Paper Name] technique...").

Constraints: Avoid "Generic" projects (e.g., no basic chatbots or simple sentiment analysis). Prioritize projects that demonstrate End-to-End Engineering: Data ingestion, Model/Logic, and Deployment.

Focus on current 2026 trends: Agentic workflows, Multi-modal RAG, Small Language Model (SLM) optimization, and AI Security/Privacy.

Thinking Process: Before listing the projects, briefly summarize the 3 biggest "Research Themes" you see in this batch to ground your suggestions."""

JSON_SCHEMA_INSTRUCTION = """
Return ONLY raw JSON matching this exact schema. No markdown fences. No commentary. No trailing commas.

{
  "researchThemes": ["theme1", "theme2", "theme3"],
  "ideas": [
    {
      "startupName": "string",
      "valueProposition": "Exactly two sentences.",
      "whyThisPaper": "Exactly one sentence explaining why a hiring manager would be impressed by this paper-to-project translation.",
      "technicalCore": "string",
      "implementation": "string",
      "techStack": ["string", "5-12 items"],
      "resumeBullets": ["bullet1", "bullet2", "bullet3"],
      "paper": {
        "title": "string",
        "url": "string",
        "authors": ["optional"],
        "abstract": "optional",
        "arxivId": "optional",
        "publishedAt": "optional",
        "primaryCategory": "optional"
      },
      "scores": {
        "demand_urgency": 0,
        "pricing_power": 0,
        "distribution_ease": 0,
        "speed_to_mvp": 0
      }
    }
  ]
}

Hard requirements:
- Return ONLY raw JSON. No markdown fences. No commentary.
- Provide exactly 3 researchThemes.
- Choose 5-10 ideas.
- valueProposition must be exactly two sentences.
- whyThisPaper must be exactly one sentence.
- resumeBullets must be Action-Context-Result style.
- scores must be integer 0-10 for each field.
"""

REPAIR_PROMPT = "Fix this to valid JSON ONLY matching the schema. Output only JSON."


def _build_papers_block(papers: list[ArxivPaper]) -> str:
    lines: list[str] = []
    for i, p in enumerate(papers, 1):
        lines.append(
            f"{i}. [{p.primary_category}] {p.title}\n"
            f"   URL: {p.url}\n"
            f"   Authors: {', '.join(p.authors[:5])}\n"
            f"   Abstract: {p.abstract[:500]}\n"
        )
    return "\n".join(lines)


def _call_openrouter(
    api_key: str,
    model: str,
    messages: list[dict[str, str]],
    timeout: float = 300.0,
) -> str | None:
    """Call OpenRouter chat completions. Returns content string or None on failure."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://mvpxiv.dev",
        "X-Title": "MVPXiv",
    }
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 8000,
    }

    try:
        resp = httpx.post(
            OPENROUTER_URL,
            json=payload,
            headers=headers,
            timeout=timeout,
        )
        resp.raise_for_status()
        data = resp.json()
        content = data["choices"][0]["message"]["content"]
        return content.strip()
    except Exception as e:
        print(f"  [llm] Error with {model}: {e}")
        return None


def _extract_json(raw: str) -> str:
    """Strip markdown fences and leading/trailing noise to get raw JSON."""
    text = raw.strip()
    if text.startswith("```"):
        first_newline = text.index("\n")
        text = text[first_newline + 1 :]
    if text.endswith("```"):
        text = text[: text.rfind("```")]
    text = text.strip()

    start = text.find("{")
    if start > 0:
        text = text[start:]

    return text


def _validate_response(data: dict[str, Any]) -> bool:
    """Basic structural validation of LLM JSON output."""
    if not isinstance(data.get("researchThemes"), list):
        return False
    if len(data["researchThemes"]) != 3:
        return False
    ideas = data.get("ideas")
    if not isinstance(ideas, list) or not (5 <= len(ideas) <= 10):
        return False
    for idea in ideas:
        if not isinstance(idea.get("startupName"), str):
            return False
        if not isinstance(idea.get("scores"), dict):
            return False
        scores = idea["scores"]
        for key in ("demand_urgency", "pricing_power", "distribution_ease", "speed_to_mvp"):
            val = scores.get(key)
            if not isinstance(val, (int, float)) or not (0 <= val <= 10):
                return False
    return True


def generate_blueprints(
    api_key: str,
    papers: list[ArxivPaper],
) -> dict[str, Any] | None:
    """
    Call LLM with fallback chain to generate startup blueprints.
    Returns parsed + validated JSON dict, or None if all models fail.
    """
    papers_block = _build_papers_block(papers)
    user_message = (
        f"{MASTER_INSTRUCTION}\n\n"
        f"{JSON_SCHEMA_INSTRUCTION}\n\n"
        f"--- PAPERS ---\n{papers_block}"
    )
    messages = [
        {"role": "system", "content": "You are a JSON-only API. Return raw JSON."},
        {"role": "user", "content": user_message},
    ]

    for model in FALLBACK_MODELS:
        print(f"[llm] Trying model: {model}")
        raw = _call_openrouter(api_key, model, messages)
        if not raw:
            print(f"  [llm] No response from {model}, trying next...")
            continue

        json_str = _extract_json(raw)

        # Attempt parse
        for attempt in range(1 + MAX_REPAIR_ATTEMPTS):
            try:
                data = json.loads(json_str)
                if _validate_response(data):
                    print(f"  [llm] Valid response from {model}")
                    return data
                else:
                    print(f"  [llm] Validation failed (attempt {attempt + 1})")
            except json.JSONDecodeError as e:
                print(f"  [llm] JSON parse error (attempt {attempt + 1}): {e}")

            if attempt < MAX_REPAIR_ATTEMPTS:
                print(f"  [llm] Sending repair prompt...")
                repair_messages = [
                    {"role": "system", "content": "You are a JSON repair tool."},
                    {"role": "user", "content": f"{REPAIR_PROMPT}\n\n{json_str}"},
                ]
                repaired = _call_openrouter(api_key, model, repair_messages)
                if repaired:
                    json_str = _extract_json(repaired)
                else:
                    break

        print(f"  [llm] {model} failed after repair attempts, trying next...")
        time.sleep(1)

    print("[llm] All models failed.")
    return None


if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    from automation.ingest_arxiv import fetch_recent_papers

    load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
    key = os.environ["OPENROUTER_API_KEY"]

    papers = fetch_recent_papers(max_per_category=10)
    result = generate_blueprints(key, papers)
    if result:
        print(f"Got {len(result['ideas'])} ideas")
        print(f"Themes: {result['researchThemes']}")
    else:
        print("Pipeline failed")
