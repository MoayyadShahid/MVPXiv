"""
Categorization rubric: scores → category.

Score each idea 0–10 on 4 dimensions. Total /40 maps to category:
  0–14  → BACKLOG
  15–22 → CONSIDERABLE
  23–30 → PROMISING
  31–40 → LUCRATIVE
"""

from __future__ import annotations

from typing import Any

CATEGORY_THRESHOLDS = [
    (14, "BACKLOG"),
    (22, "CONSIDERABLE"),
    (30, "PROMISING"),
    (40, "LUCRATIVE"),
]


def compute_category(scores: dict[str, int | float]) -> str:
    """Given a scores dict with 4 keys (0-10 each), return the category string."""
    total = int(
        scores.get("demand_urgency", 0)
        + scores.get("pricing_power", 0)
        + scores.get("distribution_ease", 0)
        + scores.get("speed_to_mvp", 0)
    )
    total = max(0, min(40, total))

    for threshold, category in CATEGORY_THRESHOLDS:
        if total <= threshold:
            return category
    return "LUCRATIVE"


def apply_rubric(ideas_raw: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """
    For each idea dict from the LLM, compute the category deterministically
    from the scores and attach it. Returns mutated list.
    """
    for idea in ideas_raw:
        scores = idea.get("scores", {})
        idea["category"] = compute_category(scores)
        idea["_total_score"] = int(
            scores.get("demand_urgency", 0)
            + scores.get("pricing_power", 0)
            + scores.get("distribution_ease", 0)
            + scores.get("speed_to_mvp", 0)
        )
    return ideas_raw


if __name__ == "__main__":
    test_cases = [
        {"demand_urgency": 2, "pricing_power": 3, "distribution_ease": 4, "speed_to_mvp": 3},  # 12 → BACKLOG
        {"demand_urgency": 5, "pricing_power": 5, "distribution_ease": 5, "speed_to_mvp": 5},  # 20 → CONSIDERABLE
        {"demand_urgency": 7, "pricing_power": 6, "distribution_ease": 7, "speed_to_mvp": 6},  # 26 → PROMISING
        {"demand_urgency": 9, "pricing_power": 8, "distribution_ease": 8, "speed_to_mvp": 9},  # 34 → LUCRATIVE
    ]
    for scores in test_cases:
        cat = compute_category(scores)
        total = sum(scores.values())
        print(f"  {total}/40 → {cat}")
