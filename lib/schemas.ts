/**
 * Zod schemas for runtime validation of API responses
 */

import { z } from "zod";

const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
const isoDatetime = /^\d{4}-\d{2}-\d{2}T[\d:.]+Z?$/;
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const paperSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  authors: z.array(z.string()).optional(),
  abstract: z.string().optional(),
  arxivId: z.string().optional(),
  publishedAt: z.string().optional(),
  primaryCategory: z.enum(["cs.LG", "cs.MA"]).optional(),
});

export const ideaCategorySchema = z.enum([
  "BACKLOG",
  "CONSIDERABLE",
  "PROMISING",
  "LUCRATIVE",
]);

export const ideaSchema = z.object({
  id: z.string().regex(uuidRegex),
  batchDate: z.string().regex(dateFormat),
  category: ideaCategorySchema,
  startupName: z.string(),
  valueProposition: z.string(),
  technicalCore: z.string(),
  implementation: z.string(),
  techStack: z.array(z.string()).min(5).max(12),
  resumeBullets: z.tuple([z.string(), z.string(), z.string()]),
  whyThisPaper: z.string(),
  paper: paperSchema,
  createdAt: z.string().regex(isoDatetime),
});

export const countsByCategorySchema = z.object({
  backlog: z.number().int().min(0),
  considerable: z.number().int().min(0),
  promising: z.number().int().min(0),
  lucrative: z.number().int().min(0),
});

export const batchSchema = z.object({
  id: z.string().regex(dateFormat),
  date: z.string().regex(dateFormat),
  createdAt: z.string().regex(isoDatetime),
  sources: z.array(z.string()),
  researchThemes: z.array(z.string()).length(3),
  countsByCategory: countsByCategorySchema,
  ideaIds: z.array(z.string()),
});

export const batchWithIdeasSchema = z.object({
  batch: batchSchema,
  ideas: z.array(ideaSchema),
});

export const batchListSchema = z.array(batchSchema);

export type PaperInput = z.infer<typeof paperSchema>;
export type IdeaInput = z.infer<typeof ideaSchema>;
export type BatchInput = z.infer<typeof batchSchema>;
export type BatchWithIdeasInput = z.infer<typeof batchWithIdeasSchema>;
