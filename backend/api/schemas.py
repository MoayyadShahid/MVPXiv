"""Pydantic models — match TypeScript types + Supabase schema."""

from __future__ import annotations

from datetime import date, datetime
from enum import Enum
from typing import Literal, Optional

from pydantic import BaseModel, Field, field_validator


class IdeaCategory(str, Enum):
    BACKLOG = "BACKLOG"
    CONSIDERABLE = "CONSIDERABLE"
    PROMISING = "PROMISING"
    LUCRATIVE = "LUCRATIVE"


class Paper(BaseModel):
    title: str
    url: str
    authors: list[str] | None = None
    abstract: str | None = None
    arxiv_id: str | None = Field(None, alias="arxivId")
    published_at: str | None = Field(None, alias="publishedAt")
    primary_category: Literal["cs.LG", "cs.MA"] | None = Field(
        None, alias="primaryCategory"
    )

    class Config:
        populate_by_name = True


class CountsByCategory(BaseModel):
    backlog: int = 0
    considerable: int = 0
    promising: int = 0
    lucrative: int = 0


class Idea(BaseModel):
    id: str
    batch_date: str = Field(alias="batchDate")
    category: IdeaCategory
    startup_name: str = Field(alias="startupName")
    value_proposition: str = Field(alias="valueProposition")
    technical_core: str = Field(alias="technicalCore")
    implementation: str
    tech_stack: list[str] = Field(alias="techStack")
    resume_bullets: tuple[str, str, str] = Field(alias="resumeBullets")
    why_this_paper: str = Field(alias="whyThisPaper")
    paper: Paper
    created_at: str = Field(alias="createdAt")

    class Config:
        populate_by_name = True

    @field_validator("tech_stack")
    @classmethod
    def tech_stack_size(cls, v: list[str]) -> list[str]:
        if not (5 <= len(v) <= 12):
            raise ValueError("techStack must have 5–12 items")
        return v


class Batch(BaseModel):
    id: str
    date: str
    created_at: str = Field(alias="createdAt")
    sources: list[str]
    research_themes: list[str] = Field(alias="researchThemes")
    counts_by_category: CountsByCategory = Field(alias="countsByCategory")
    idea_ids: list[str] = Field(alias="ideaIds")

    class Config:
        populate_by_name = True


class BatchWithIdeas(BaseModel):
    batch: Batch
    ideas: list[Idea]


# --- DB row → API model helpers ---

def row_to_batch(row: dict) -> Batch:
    """Convert a Supabase batches row into a Batch API model."""
    idea_ids: list[str] = row.get("idea_ids", []) or []
    return Batch(
        id=row["id"],
        date=row["id"],
        createdAt=row["created_at"],
        sources=row.get("sources", ["cs.LG", "cs.MA"]),
        researchThemes=row.get("research_themes", []),
        countsByCategory=CountsByCategory(
            backlog=row.get("counts_backlog", 0),
            considerable=row.get("counts_considerable", 0),
            promising=row.get("counts_promising", 0),
            lucrative=row.get("counts_lucrative", 0),
        ),
        ideaIds=idea_ids,
    )


def row_to_idea(row: dict) -> Idea:
    """Convert a Supabase ideas row into an Idea API model."""
    return Idea(
        id=str(row["id"]),
        batchDate=row["batch_date"],
        category=row["category"],
        startupName=row["startup_name"],
        valueProposition=row["value_proposition"],
        technicalCore=row["technical_core"],
        implementation=row["implementation"],
        techStack=row.get("tech_stack", []),
        resumeBullets=tuple(row.get("resume_bullets", ["", "", ""])),
        whyThisPaper=row["why_this_paper"],
        paper=Paper(
            title=row["paper_title"],
            url=row["paper_url"],
            authors=row.get("paper_authors"),
            abstract=row.get("paper_abstract"),
            arxivId=row.get("paper_arxiv_id"),
            publishedAt=row.get("paper_published_at"),
            primaryCategory=row.get("paper_primary_category"),
        ),
        createdAt=row["created_at"],
    )
