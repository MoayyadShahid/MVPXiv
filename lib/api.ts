/**
 * API abstraction layer.
 *
 * - USE_MOCK = true  → local mock data (no external deps)
 * - USE_MOCK = false → reads directly from Supabase (works on Vercel)
 *
 * All responses validated with Zod.
 */

import {
  batchWithIdeasSchema,
  batchListSchema,
  ideaSchema,
  batchSchema,
} from "./schemas";
import type { Batch, Idea } from "./types";
import {
  getMockLatestBatch,
  getMockBatches,
  getMockBatchByDate,
  getMockIdeaById,
} from "@/data/mockData";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// ── Supabase helpers (server-side only) ──────────────────

async function supabaseFetchLatestBatch(): Promise<{
  batch: Batch;
  ideas: Idea[];
} | null> {
  const { getSupabase } = await import("./supabase");
  const sb = getSupabase();

  const { data: batchRow, error: bErr } = await sb
    .from("batches")
    .select("*")
    .order("date", { ascending: false })
    .limit(1)
    .single();

  if (bErr || !batchRow) return null;

  const { data: ideaRows, error: iErr } = await sb
    .from("ideas")
    .select("*")
    .eq("batch_date", batchRow.id)
    .order("created_at", { ascending: true });

  if (iErr) throw new Error(`Ideas fetch error: ${iErr.message}`);

  return {
    batch: rowToBatch(batchRow, ideaRows ?? []),
    ideas: (ideaRows ?? []).map(rowToIdea),
  };
}

async function supabaseFetchBatches(): Promise<Batch[]> {
  const { getSupabase } = await import("./supabase");
  const sb = getSupabase();

  const { data: batchRows, error } = await sb
    .from("batches")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw new Error(`Batches fetch error: ${error.message}`);

  const result: Batch[] = [];
  for (const row of batchRows ?? []) {
    const { data: ideaRows } = await sb
      .from("ideas")
      .select("id")
      .eq("batch_date", row.id);
    result.push(rowToBatch(row, ideaRows ?? []));
  }
  return result;
}

async function supabaseFetchBatchByDate(
  date: string
): Promise<{ batch: Batch; ideas: Idea[] }> {
  const { getSupabase } = await import("./supabase");
  const sb = getSupabase();

  const { data: batchRow, error: bErr } = await sb
    .from("batches")
    .select("*")
    .eq("id", date)
    .single();

  if (bErr || !batchRow) throw new Error(`Batch not found: ${date}`);

  const { data: ideaRows, error: iErr } = await sb
    .from("ideas")
    .select("*")
    .eq("batch_date", date)
    .order("created_at", { ascending: true });

  if (iErr) throw new Error(`Ideas fetch error: ${iErr.message}`);

  return {
    batch: rowToBatch(batchRow, ideaRows ?? []),
    ideas: (ideaRows ?? []).map(rowToIdea),
  };
}

async function supabaseFetchIdeaById(id: string): Promise<Idea> {
  const { getSupabase } = await import("./supabase");
  const sb = getSupabase();

  const { data: row, error } = await sb
    .from("ideas")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !row) throw new Error(`Idea not found: ${id}`);
  return rowToIdea(row);
}

// ── Row → Model converters ──────────────────────────────

function rowToBatch(row: Record<string, unknown>, ideaRows: Record<string, unknown>[]): Batch {
  return {
    id: row.id as string,
    date: row.id as string,
    createdAt: row.created_at as string,
    sources: (row.sources as string[]) ?? ["cs.LG", "cs.MA"],
    researchThemes: (row.research_themes as string[]) ?? [],
    countsByCategory: {
      backlog: (row.counts_backlog as number) ?? 0,
      considerable: (row.counts_considerable as number) ?? 0,
      promising: (row.counts_promising as number) ?? 0,
      lucrative: (row.counts_lucrative as number) ?? 0,
    },
    ideaIds: ideaRows.map((r) => String(r.id)),
  };
}

function rowToIdea(row: Record<string, unknown>): Idea {
  return {
    id: String(row.id),
    batchDate: row.batch_date as string,
    category: row.category as Idea["category"],
    startupName: row.startup_name as string,
    valueProposition: row.value_proposition as string,
    technicalCore: row.technical_core as string,
    implementation: row.implementation as string,
    techStack: (row.tech_stack as string[]) ?? [],
    resumeBullets: ((row.resume_bullets as string[]) ?? ["", "", ""]).slice(0, 3) as [string, string, string],
    whyThisPaper: row.why_this_paper as string,
    paper: {
      title: row.paper_title as string,
      url: row.paper_url as string,
      authors: (row.paper_authors as string[] | undefined) ?? undefined,
      abstract: (row.paper_abstract as string | undefined) ?? undefined,
      arxivId: (row.paper_arxiv_id as string | undefined) ?? undefined,
      publishedAt: (row.paper_published_at as string | undefined) ?? undefined,
      primaryCategory: (row.paper_primary_category as "cs.LG" | "cs.MA" | undefined) ?? undefined,
    },
    createdAt: row.created_at as string,
  };
}

// ── Public API ───────────────────────────────────────────

export async function fetchLatestBatch(): Promise<{
  batch: Batch;
  ideas: Idea[];
} | null> {
  if (USE_MOCK) return getMockLatestBatch();
  return supabaseFetchLatestBatch();
}

export async function fetchBatches(): Promise<Batch[]> {
  if (USE_MOCK) return getMockBatches();
  return supabaseFetchBatches();
}

export async function fetchBatchByDate(
  date: string
): Promise<{ batch: Batch; ideas: Idea[] }> {
  if (USE_MOCK) return getMockBatchByDate(date);
  return supabaseFetchBatchByDate(date);
}

export async function fetchIdeaById(id: string): Promise<Idea> {
  if (USE_MOCK) return getMockIdeaById(id);
  return supabaseFetchIdeaById(id);
}
