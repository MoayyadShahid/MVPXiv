from fastapi import APIRouter, HTTPException

from backend.api.schemas import Idea, row_to_idea
from backend.db.supabase import fetch_idea_row_by_id

router = APIRouter(prefix="/api/ideas", tags=["ideas"])


@router.get("/{idea_id}", response_model=Idea)
async def get_idea(idea_id: str):
    row = fetch_idea_row_by_id(idea_id)
    if not row:
        raise HTTPException(404, f"Idea not found: {idea_id}")
    return row_to_idea(row)
