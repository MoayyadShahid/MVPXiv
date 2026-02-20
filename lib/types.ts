/**
 * MVPXiv TypeScript types — must match Pydantic + Zod schemas
 */

export type IdeaCategory =
  | "BACKLOG"
  | "CONSIDERABLE"
  | "PROMISING"
  | "LUCRATIVE";

export interface Paper {
  title: string;
  url: string;
  authors?: string[];
  abstract?: string;
  arxivId?: string;
  publishedAt?: string;
  primaryCategory?: "cs.LG" | "cs.MA";
}

export interface Idea {
  id: string;
  batchDate: string; // YYYY-MM-DD
  category: IdeaCategory;
  startupName: string;
  valueProposition: string;
  technicalCore: string;
  implementation: string;
  techStack: string[];
  resumeBullets: [string, string, string];
  whyThisPaper: string;
  paper: Paper;
  createdAt: string; // ISO datetime
}

export interface CountsByCategory {
  backlog: number;
  considerable: number;
  promising: number;
  lucrative: number;
}

export interface Batch {
  id: string; // YYYY-MM-DD
  date: string; // YYYY-MM-DD
  createdAt: string; // ISO datetime
  sources: string[];
  researchThemes: string[];
  countsByCategory: CountsByCategory;
  ideaIds: string[];
}
