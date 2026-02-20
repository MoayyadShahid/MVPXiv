from fastapi import APIRouter, HTTPException

from backend.api.schemas import (
    Batch,
    BatchWithIdeas,
    row_to_batch,
    row_to_idea,
)
from backend.db.supabase import (
    fetch_latest_batch_row,
    fetch_all_batch_rows,
    fetch_batch_row_by_date,
    fetch_ideas_by_batch,
)

router = APIRouter(prefix="/api/batches", tags=["batches"])


def _enrich_batch_with_idea_ids(batch_row: dict, idea_rows: list[dict]) -> dict:
    """Attach idea_ids list to a batch row before conversion."""
    batch_row["idea_ids"] = [str(r["id"]) for r in idea_rows]
    return batch_row


@router.get("/latest", response_model=BatchWithIdeas)
async def get_latest_batch():
    row = fetch_latest_batch_row()
    if not row:
        raise HTTPException(404, "No batches found")
    idea_rows = fetch_ideas_by_batch(row["id"])
    _enrich_batch_with_idea_ids(row, idea_rows)
    return BatchWithIdeas(
        batch=row_to_batch(row),
        ideas=[row_to_idea(r) for r in idea_rows],
    )


@router.get("", response_model=list[Batch])
async def list_batches():
    rows = fetch_all_batch_rows()
    result: list[Batch] = []
    for row in rows:
        idea_rows = fetch_ideas_by_batch(row["id"])
        _enrich_batch_with_idea_ids(row, idea_rows)
        result.append(row_to_batch(row))
    return result


@router.get("/{date}", response_model=BatchWithIdeas)
async def get_batch_by_date(date: str):
    row = fetch_batch_row_by_date(date)
    if not row:
        raise HTTPException(404, f"Batch not found: {date}")
    idea_rows = fetch_ideas_by_batch(date)
    _enrich_batch_with_idea_ids(row, idea_rows)
    return BatchWithIdeas(
        batch=row_to_batch(row),
        ideas=[row_to_idea(r) for r in idea_rows],
    )
