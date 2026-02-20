"""Fetch newest arXiv papers for cs.LG and cs.MA using the arxiv package."""

from __future__ import annotations

import time
import arxiv
from dataclasses import dataclass


@dataclass
class ArxivPaper:
    title: str
    url: str
    authors: list[str]
    abstract: str
    arxiv_id: str
    published_at: str
    primary_category: str


def fetch_recent_papers(
    categories: list[str] | None = None,
    max_per_category: int = 25,
) -> list[ArxivPaper]:
    """
    Fetch newest papers from arXiv for the given categories.
    Uses the arxiv Python package (no HTML scraping).
    Adds inter-category delay to avoid 429 rate limits.
    """
    if categories is None:
        categories = ["cs.LG", "cs.MA"]

    all_papers: list[ArxivPaper] = []
    seen_ids: set[str] = set()

    for idx, cat in enumerate(categories):
        if idx > 0:
            print(f"  [ingest] Waiting 10s before next category to avoid rate limit...")
            time.sleep(10)

        print(f"  [ingest] Querying {cat} (max {max_per_category})...")
        query = f"cat:{cat}"
        search = arxiv.Search(
            query=query,
            max_results=max_per_category,
            sort_by=arxiv.SortCriterion.SubmittedDate,
            sort_order=arxiv.SortOrder.Descending,
        )

        client = arxiv.Client(
            page_size=max_per_category,
            delay_seconds=5.0,
            num_retries=5,
        )

        try:
            for result in client.results(search):
                aid = result.entry_id.split("/abs/")[-1]
                if aid in seen_ids:
                    continue
                seen_ids.add(aid)

                paper = ArxivPaper(
                    title=result.title.strip().replace("\n", " "),
                    url=result.entry_id,
                    authors=[a.name for a in result.authors],
                    abstract=result.summary.strip().replace("\n", " "),
                    arxiv_id=aid,
                    published_at=result.published.strftime("%Y-%m-%d"),
                    primary_category=result.primary_category,
                )
                all_papers.append(paper)
        except Exception as e:
            print(f"  [ingest] Error fetching {cat}: {e}")
            print(f"  [ingest] Continuing with papers fetched so far...")

    print(f"[ingest] Fetched {len(all_papers)} papers across {categories}")
    return all_papers


if __name__ == "__main__":
    papers = fetch_recent_papers(max_per_category=5)
    for p in papers:
        print(f"  [{p.primary_category}] {p.title[:80]}...")
