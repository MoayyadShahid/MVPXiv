# MVPXiv

**arXiv → MVPs. Daily.**

MVPXiv ingests new arXiv papers (cs.LG and cs.MA) daily, generates 5–10 actionable startup-grade project blueprints using an LLM, and lets you browse them by category. Built for ambitious builders.

## Features

- **Daily ingestion** — Fetches latest papers from arXiv (cs.LG, cs.MA)
- **LLM blueprints** — 5–10 ideas per batch with value props, tech stacks, and resume bullets
- **Categories** — Backlog, Considerable, Promising, Lucrative (score-based rubric)
- **Browse** — Filter by category, view details in a modal

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL)
- **Automation:** Python, OpenRouter (LLM), arXiv API
- **Deploy:** Vercel, GitHub Actions (daily cron)

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Supabase account
- OpenRouter API key

### 1. Clone and install

```bash
git clone https://github.com/MoayyadShahid/MVPXiv.git
cd MVPXiv
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Fill in:

- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
- `OPENROUTER_API_KEY` — OpenRouter API key
- `NEXT_PUBLIC_USE_MOCK` — `true` for mock data, `false` for Supabase

### 3. Database setup

Run `supabase/schema.sql` in the Supabase SQL Editor.

### 4. Run locally

```bash
npm run dev
```

### 5. (Optional) Populate data

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r automation/requirements.txt
python -m automation.run_daily
```

## Deployment

1. Push to GitHub
2. Deploy to [Vercel](https://vercel.com)
3. Add env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_USE_MOCK=false`
4. Add GitHub secrets for the daily pipeline: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENROUTER_API_KEY`

The workflow runs automatically Mon–Fri at 2:30 UTC (~9:30 PM ET Sun–Thu), or trigger manually via **Actions → Daily Pipeline → Run workflow**.

## Project Structure

```
app/                 # Next.js pages
components/          # React components
lib/                 # API, types, utilities
automation/          # Python pipeline (ingest, LLM, categorize, persist)
supabase/            # Schema and migrations
.github/workflows/   # Daily pipeline cron
```

## License

MIT — see [LICENSE](LICENSE).

---

Made with ❤️ by [Moayyad](https://github.com/MoayyadShahid)
