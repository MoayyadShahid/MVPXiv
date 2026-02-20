"""Supabase client + query functions for batches and ideas."""

from __future__ import annotations

from functools import lru_cache
from supabase import create_client, Client

from backend.config import get_settings


@lru_cache()
def get_client() -> Client:
    s = get_settings()
    return create_client(s.supabase_url, s.supabase_service_role_key)


# ── Batches ──────────────────────────────────────────────

def fetch_latest_batch_row() -> dict | None:
    """Return the most recent batch row, or None."""
    resp = (
        get_client()
        .table("batches")
        .select("*")
        .order("date", desc=True)
        .limit(1)
        .execute()
    )
    return resp.data[0] if resp.data else None


def fetch_all_batch_rows() -> list[dict]:
    """Return all batches ordered newest-first."""
    resp = (
        get_client()
        .table("batches")
        .select("*")
        .order("date", desc=True)
        .execute()
    )
    return resp.data or []


def fetch_batch_row_by_date(date_str: str) -> dict | None:
    """Return a single batch by its id (YYYY-MM-DD), or None."""
    resp = (
        get_client()
        .table("batches")
        .select("*")
        .eq("id", date_str)
        .limit(1)
        .execute()
    )
    return resp.data[0] if resp.data else None


# ── Ideas ────────────────────────────────────────────────

def fetch_ideas_by_batch(batch_date: str) -> list[dict]:
    """Return all ideas for a given batch date."""
    resp = (
        get_client()
        .table("ideas")
        .select("*")
        .eq("batch_date", batch_date)
        .order("created_at", desc=False)
        .execute()
    )
    return resp.data or []


def fetch_idea_row_by_id(idea_id: str) -> dict | None:
    """Return a single idea by UUID, or None."""
    resp = (
        get_client()
        .table("ideas")
        .select("*")
        .eq("id", idea_id)
        .limit(1)
        .execute()
    )
    return resp.data[0] if resp.data else None


# ── Writes (used by automation pipeline) ─────────────────

def upsert_batch(row: dict) -> dict:
    """Insert or update a batch row."""
    resp = get_client().table("batches").upsert(row).execute()
    return resp.data[0] if resp.data else row


def insert_ideas(rows: list[dict]) -> list[dict]:
    """Bulk-insert idea rows."""
    if not rows:
        return []
    resp = get_client().table("ideas").insert(rows).execute()
    return resp.data or []


def delete_ideas_for_batch(batch_date: str) -> None:
    """Delete all ideas for a batch (used before re-inserting)."""
    get_client().table("ideas").delete().eq("batch_date", batch_date).execute()
