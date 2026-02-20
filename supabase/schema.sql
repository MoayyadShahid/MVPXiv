-- ============================================
-- MVPXiv Supabase Schema
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================
-- ENUM: idea_category
-- ============================================
create type idea_category as enum (
  'BACKLOG',
  'CONSIDERABLE',
  'PROMISING',
  'LUCRATIVE'
);

-- ============================================
-- TABLE: batches
-- ============================================
create table batches (
  id            text primary key,                -- 'YYYY-MM-DD'
  date          date        not null unique,
  created_at    timestamptz not null default now(),
  sources       text[]      not null default '{"cs.LG","cs.MA"}',
  research_themes text[3]   not null,            -- exactly 3 themes
  counts_backlog     int    not null default 0,
  counts_considerable int   not null default 0,
  counts_promising   int    not null default 0,
  counts_lucrative   int    not null default 0
);

comment on table batches is 'Daily batch of arXiv-derived startup blueprints';

-- ============================================
-- TABLE: ideas
-- ============================================
create table ideas (
  id                uuid primary key default gen_random_uuid(),
  batch_date        text        not null references batches(id) on delete cascade,
  category          idea_category not null,
  startup_name      text        not null,
  value_proposition text        not null,
  technical_core    text        not null,
  implementation    text        not null,
  tech_stack        text[]      not null,
  resume_bullets    text[3]     not null,         -- exactly 3 bullets
  why_this_paper    text        not null,

  -- Categorization scores (from LLM rubric, 0-10 each)
  score_demand_urgency    int not null default 0 check (score_demand_urgency between 0 and 10),
  score_pricing_power     int not null default 0 check (score_pricing_power between 0 and 10),
  score_distribution_ease int not null default 0 check (score_distribution_ease between 0 and 10),
  score_speed_to_mvp      int not null default 0 check (score_speed_to_mvp between 0 and 10),

  -- Source paper (embedded as columns, not a separate table)
  paper_title           text    not null,
  paper_url             text    not null,
  paper_authors         text[],
  paper_abstract        text,
  paper_arxiv_id        text,
  paper_published_at    date,
  paper_primary_category text,

  created_at  timestamptz not null default now()
);

comment on table ideas is 'Individual startup blueprint derived from an arXiv paper';

-- ============================================
-- INDEXES
-- ============================================
create index idx_ideas_batch_date on ideas(batch_date);
create index idx_ideas_category   on ideas(category);
create index idx_ideas_created_at on ideas(created_at desc);
create index idx_batches_date     on batches(date desc);

-- ============================================
-- VIEW: batch_with_counts (auto-compute counts)
-- Optional: use this instead of manually maintaining counts
-- ============================================
create or replace view batch_with_counts as
select
  b.*,
  coalesce(c.backlog, 0)      as computed_backlog,
  coalesce(c.considerable, 0) as computed_considerable,
  coalesce(c.promising, 0)    as computed_promising,
  coalesce(c.lucrative, 0)    as computed_lucrative
from batches b
left join lateral (
  select
    count(*) filter (where category = 'BACKLOG')      as backlog,
    count(*) filter (where category = 'CONSIDERABLE') as considerable,
    count(*) filter (where category = 'PROMISING')    as promising,
    count(*) filter (where category = 'LUCRATIVE')    as lucrative
  from ideas
  where ideas.batch_date = b.id
) c on true;

-- ============================================
-- RLS (Row Level Security) — public read-only
-- ============================================
alter table batches enable row level security;
alter table ideas   enable row level security;

create policy "Public read batches"
  on batches for select
  using (true);

create policy "Public read ideas"
  on ideas for select
  using (true);

-- Service role key bypasses RLS, so the backend
-- pipeline can INSERT/UPDATE freely.
