"""
MVPXiv daily pipeline orchestrator.

1. Ingest newest arXiv papers (cs.LG, cs.MA)
2. Call LLM with 4-model fallback to generate blueprints
3. Apply categorization rubric
4. Persist Batch + Ideas to Supabase

Usage:
  cd /path/to/MVPXiv
  python -m automation.run_daily
"""

from __future__ import annotations

import os
import sys
import uuid
from datetime import datetime, timezone
from collections import Counter

from dotenv import load_dotenv

# Load .env from project root
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

from supabase import create_client

from automation.ingest_arxiv import fetch_recent_papers
from automation.llm_pipeline import generate_blueprints
from automation.categorize import apply_rubric


def get_supabase_client():
    url = os.environ["SUPABASE_URL"]
    key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    return create_client(url, key)


def run_pipeline(
    max_papers_per_category: int = 25,
    date_override: str | None = None,
) -> bool:
    """
    Run the full daily pipeline. Returns True on success.
    """
    today = date_override or datetime.now(timezone.utc).strftime("%Y-%m-%d")
    print(f"{'='*60}")
    print(f"  MVPXiv Daily Pipeline — {today}")
    print(f"{'='*60}")

    # ── Step 1: Ingest papers ────────────────────────────
    print("\n[1/4] Fetching papers from arXiv...")
    papers = fetch_recent_papers(
        categories=["cs.LG", "cs.MA"],
        max_per_category=max_papers_per_category,
    )
    if not papers:
        print("  No papers found. Aborting.")
        return False

    # ── Step 2: Generate blueprints via LLM ──────────────
    print("\n[2/4] Generating blueprints via LLM...")
    api_key = os.environ["OPENROUTER_API_KEY"]
    result = generate_blueprints(api_key, papers)
    if not result:
        print("  LLM pipeline failed. Aborting.")
        return False

    research_themes = result["researchThemes"]
    ideas_raw = result["ideas"]
    print(f"  Themes: {research_themes}")
    print(f"  Raw ideas: {len(ideas_raw)}")

    # ── Step 3: Apply categorization rubric ──────────────
    print("\n[3/4] Applying categorization rubric...")
    ideas_categorized = apply_rubric(ideas_raw)

    category_counts = Counter(idea["category"] for idea in ideas_categorized)
    for cat in ["BACKLOG", "CONSIDERABLE", "PROMISING", "LUCRATIVE"]:
        print(f"  {cat}: {category_counts.get(cat, 0)}")

    # ── Step 4: Persist to Supabase ──────────────────────
    print("\n[4/4] Persisting to Supabase...")
    client = get_supabase_client()

    # Delete existing data for this date (idempotent re-runs)
    client.table("ideas").delete().eq("batch_date", today).execute()
    client.table("batches").delete().eq("id", today).execute()

    # Insert batch FIRST (ideas have a foreign key to batches)
    batch_row = {
        "id": today,
        "date": today,
        "sources": [
            "cs.LG",
            "cs.MA",
            "https://arxiv.org/list/cs.LG/new",
            "https://arxiv.org/list/cs.MA/new",
        ],
        "research_themes": research_themes[:3],
        "counts_backlog": category_counts.get("BACKLOG", 0),
        "counts_considerable": category_counts.get("CONSIDERABLE", 0),
        "counts_promising": category_counts.get("PROMISING", 0),
        "counts_lucrative": category_counts.get("LUCRATIVE", 0),
    }
    client.table("batches").upsert(batch_row).execute()
    print(f"  Upserted batch: {today}")

    # Build idea rows
    idea_rows = []
    for idea in ideas_categorized:
        paper = idea.get("paper", {})
        scores = idea.get("scores", {})
        row = {
            "id": str(uuid.uuid4()),
            "batch_date": today,
            "category": idea["category"],
            "startup_name": idea.get("startupName", "Untitled"),
            "value_proposition": idea.get("valueProposition", ""),
            "technical_core": idea.get("technicalCore", ""),
            "implementation": idea.get("implementation", ""),
            "tech_stack": idea.get("techStack", [])[:12],
            "resume_bullets": (idea.get("resumeBullets", []) + ["", "", ""])[:3],
            "why_this_paper": idea.get("whyThisPaper", ""),
            "score_demand_urgency": int(scores.get("demand_urgency", 0)),
            "score_pricing_power": int(scores.get("pricing_power", 0)),
            "score_distribution_ease": int(scores.get("distribution_ease", 0)),
            "score_speed_to_mvp": int(scores.get("speed_to_mvp", 0)),
            "paper_title": paper.get("title", ""),
            "paper_url": paper.get("url", ""),
            "paper_authors": paper.get("authors", []),
            "paper_abstract": paper.get("abstract"),
            "paper_arxiv_id": paper.get("arxivId"),
            "paper_published_at": paper.get("publishedAt"),
            "paper_primary_category": paper.get("primaryCategory"),
        }
        idea_rows.append(row)

    # Insert ideas
    if idea_rows:
        client.table("ideas").insert(idea_rows).execute()
        print(f"  Inserted {len(idea_rows)} ideas")

    print(f"\n{'='*60}")
    print(f"  Pipeline complete! {len(idea_rows)} ideas for {today}")
    print(f"{'='*60}")
    return True


if __name__ == "__main__":
    success = run_pipeline()
    sys.exit(0 if success else 1)
