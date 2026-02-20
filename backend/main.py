"""MVPXiv FastAPI backend — serves batches and ideas from Supabase."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.routes.batches import router as batches_router
from backend.api.routes.ideas import router as ideas_router

app = FastAPI(
    title="MVPXiv API",
    version="0.1.0",
    description="arXiv → startup-grade MVP blueprints",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(batches_router)
app.include_router(ideas_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
