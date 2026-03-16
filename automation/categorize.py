"""
Categorization rubric: scores → category.

Score each idea 0–10 on 4 dimensions. Total /40 maps to category:
  0–14  → BACKLOG
  15–22 → CONSIDERABLE
  23–30 → PROMISING
  31–40 → LUCRATIVE

After threshold-based assignment, enforce_distribution() guarantees
the target portfolio: 1 BACKLOG, 3 CONSIDERABLE, 3 PROMISING, 1 LUCRATIVE
by sorting ideas by total score and assigning categories by rank.
"""

from __future__ import annotations

from typing import Any

CATEGORY_THRESHOLDS = [
    (14, "BACKLOG"),
    (22, "CONSIDERABLE"),
    (30, "PROMISING"),
    (40, "LUCRATIVE"),
]

TARGET_DISTRIBUTION = [
    "BACKLOG",
    "CONSIDERABLE",
    "CONSIDERABLE",
    "CONSIDERABLE",
    "PROMISING",
    "PROMISING",
    "PROMISING",
    "LUCRATIVE",
]


def _total_score(scores: dict[str, int | float]) -> int:
    total = int(
        scores.get("demand_urgency", 0)
        + scores.get("pricing_power", 0)
        + scores.get("distribution_ease", 0)
        + scores.get("speed_to_mvp", 0)
    )
    return max(0, min(40, total))


def compute_category(scores: dict[str, int | float]) -> str:
    """Given a scores dict with 4 keys (0-10 each), return the category string."""
    total = _total_score(scores)
    for threshold, category in CATEGORY_THRESHOLDS:
        if total <= threshold:
            return category
    return "LUCRATIVE"


def apply_rubric(ideas_raw: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """
    For each idea dict from the LLM, compute total score and attach it.
    Then assign categories using threshold-based logic as a baseline.
    """
    for idea in ideas_raw:
        scores = idea.get("scores", {})
        idea["_total_score"] = _total_score(scores)
        idea["category"] = compute_category(scores)
    return ideas_raw


def enforce_distribution(ideas: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """
    Sort ideas by total score ascending and force-assign the target
    portfolio distribution (1 BACKLOG, 3 CONSIDERABLE, 3 PROMISING,
    1 LUCRATIVE) by rank. Guarantees the distribution regardless of
    how the LLM scored.

    If there are more or fewer than 8 ideas, falls back to the
    threshold-based categories already assigned by apply_rubric.
    """
    if len(ideas) != len(TARGET_DISTRIBUTION):
        print(f"  [categorize] Got {len(ideas)} ideas, expected {len(TARGET_DISTRIBUTION)}; skipping distribution enforcement")
        return ideas

    ranked = sorted(ideas, key=lambda i: i.get("_total_score", 0))
    for idea, category in zip(ranked, TARGET_DISTRIBUTION):
        idea["category"] = category

    return ideas


if __name__ == "__main__":
    test_ideas = [
        {"scores": {"demand_urgency": 9, "pricing_power": 8, "distribution_ease": 8, "speed_to_mvp": 9}},
        {"scores": {"demand_urgency": 7, "pricing_power": 6, "distribution_ease": 7, "speed_to_mvp": 6}},
        {"scores": {"demand_urgency": 7, "pricing_power": 7, "distribution_ease": 5, "speed_to_mvp": 6}},
        {"scores": {"demand_urgency": 8, "pricing_power": 7, "distribution_ease": 6, "speed_to_mvp": 7}},
        {"scores": {"demand_urgency": 6, "pricing_power": 5, "distribution_ease": 4, "speed_to_mvp": 5}},
        {"scores": {"demand_urgency": 5, "pricing_power": 4, "distribution_ease": 5, "speed_to_mvp": 5}},
        {"scores": {"demand_urgency": 3, "pricing_power": 3, "distribution_ease": 3, "speed_to_mvp": 3}},
        {"scores": {"demand_urgency": 5, "pricing_power": 5, "distribution_ease": 4, "speed_to_mvp": 4}},
    ]
    ideas = apply_rubric(test_ideas)
    ideas = enforce_distribution(ideas)
    for idea in sorted(ideas, key=lambda i: i["_total_score"]):
        print(f"  {idea['_total_score']}/40 → {idea['category']}")
