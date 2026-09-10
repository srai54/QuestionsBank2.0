# Project Context Handoff — Interview Question Bank + Search Backend

## Goal
Build a searchable interview-prep question bank (target **1,000 questions now, ~30,000 later**) that any human or LLM can search in **milliseconds**. Topics span: .NET/C#/ASP.NET Core, Angular, React, SQL & stored-procedure optimization, Azure (Entra ID, API Management, Redis [hashset vs KVP], Service Bus queue/topic, Logic Apps, Function Apps [http/timer/event triggers], Blob [block/append/page], Hangfire), MongoDB, microservices, event-driven architecture, Semantic Kernel / AI agents / AI orchestration, REST APIs, auth/security, Docker/K8s, CI/CD, logging/monitoring, testing (incl. Cucumber/BDD, Selenium, Karate, TestNG, Jest), Clean Architecture & SOLID, Power BI/SSIS/ETL, JS/TS, system design, and behavioral.

## User's deployment stack (FINAL — build for this)
- **Frontend:** React (hosting mentioned: Netlify)
- **Backend:** .NET (Web API)
- **Database:** PostgreSQL on **Supabase** (free tier)
- Scale plan: 1,000 rows now, 30,000 confirmed soon.

## FINAL ARCHITECTURE DECISION (agreed)
Use **PostgreSQL full-text search (FTS) on Supabase, queried through the .NET API.**
Rationale: they already have Postgres; FTS with a GIN index handles 30k (and millions) in ~1–5 ms; no new infrastructure; no data movement. Rejected alternatives: shipping SQLite to browser, client-side JSON search (fine ≤10k but 30k JSON is too big to ship), and managed search (Algolia/Typesense/Azure AI Search = overkill at this scale).

### Verified benchmark (ran real PostgreSQL 16 at 30,415 rows)
- FTS query WITH GIN index: **~2.2 ms** (plan = Bitmap Index Scan on `questions_search_idx`).
- Same query WITHOUT index (≈ plain LIKE, seq scan): **~23 ms** (~10× slower; gap widens with size).
- Trigram typo tolerance (`pg_trgm`): misspelled "kubernets" matched in ~7 ms via `questions_trgm_idx`.
- Stemming confirmed: "redis eviction policy" → tsquery `redi & evict & polici`.

### CRITICAL implementation rule
The .NET query MUST use the FTS operator to hit the index:
```sql
where search @@ websearch_to_tsquery('english', @q)
```
In EF Core: `x.Search.Matches(EF.Functions.WebSearchToTsQuery("english", q))`.
Do NOT use `LIKE '%..%'` / `.Contains()` — it bypasses the index and drops to the slow ~23 ms path.

## Database schema (Supabase / PostgreSQL) — already designed & tested
```sql
create extension if not exists pg_trgm;

create table questions (
  id          bigint generated always as identity primary key,
  category    text,
  subcategory text,
  difficulty  text,
  question    text not null,
  answer      text not null,
  tags        text,
  search tsvector generated always as (
    setweight(to_tsvector('english', coalesce(question,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(tags,'')),     'B') ||
    setweight(to_tsvector('english', coalesce(answer,'')),   'C') ||
    setweight(to_tsvector('english', coalesce(category,'')), 'D')
  ) stored
);
create index questions_search_idx on questions using gin(search);
create index questions_trgm_idx   on questions using gin(question gin_trgm_ops);
create index questions_cat_idx    on questions(category);
create index questions_diff_idx   on questions(difficulty);
```
Weights: question=A (highest rank), tags=B, answer=C, category=D. `search` column is auto-generated — never maintained manually.

### Canonical search query (ranked, user-friendly syntax)
```sql
select id, category, question, answer,
       ts_rank_cd(search, websearch_to_tsquery('english', $1)) as rank
from questions
where search @@ websearch_to_tsquery('english', $1)
  and ($2 is null or category = $2)
order by rank desc
limit 20;
```

## Current deliverables (state)
Content authored: **5,004 questions** (real Q&A, each with a full answer), stored as a single JSON source file, questions.json (flat, no folders). The bank grew from 1,705 to 5,004; the 1,705 baseline is unchanged and 3,299 rows were added.

Category breakdown: C#/.NET 707, Coding 452, Azure 434, Architecture 355, SQL 331, DevOps 306, React 293, Angular 275, AI/LLM 275, Testing 240, Security 234, System Design 219, CS Fundamentals 208, Data/BI 156, Databases 136, Behavioral 132, JavaScript/TypeScript 121, Frontend 116, Observability 112, MongoDB 106, REST APIs 90.

Difficulty spread: Medium 4,280, Hard 607, Easy 117.

### Authoring pipeline (tools/, Node 18+)
Bulk additions go through `_incoming/*.json` batches rather than hand-editing questions.json:
- `tools/coverage.js` — per-category counts against a target plan; with a category name, lists what it already covers so new questions do not repeat it.
- `tools/validate.js` — schema, required fields, minimum answer length (150 chars), difficulty values, exact duplicates.
- `tools/similar.js` — near-duplicate detection by Jaccard overlap of significant words; `--self` audits questions.json against itself.
- `tools/merge.js` — merges all batches applying both the exact and near-duplicate guards (threshold 0.6 by default), reassigns ids 1..N, clears `_incoming/`.

The near-duplicate guard is the important one. Exact-text dedupe misses the same question asked in different words, which is the dominant quality risk when adding thousands of rows — roughly 150 such collisions were caught and dropped during this expansion.

Known pre-existing issue: `node tools/similar.js --self 0.75` reports 12 near-duplicate pairs, all within the original 1,705 rows (for example "What is the difference between JIT and AOT compilation?" and "What is JIT compilation and AOT?"). About four are genuine duplicates worth merging; the rest are false positives from short question text. New content was filtered at the stricter 0.6 threshold.

Files produced:
- `questions.json` — **source of truth** (single flat JSON array of all 5,004 questions; where questions get added or extended).
- `build.py` — compiles `questions.json` → `interview_qbank.json` (merged) + `interview_qbank.sqlite` (SQLite FTS5, used only for local dev/testing, NOT for production).
- `gen_sql.py` — generates `supabase_setup_and_seed.sql` (schema + indexes + all INSERTs) from the JSON.
- `schema.sql` — schema-only migration (structure + indexes, no data).
- `search.py` — local CLI to test search over the SQLite build.
- `supabase_setup_and_seed.sql` — **the file to run in Supabase** (creates table + indexes + inserts all 5,004 rows). Regenerated by gen_sql.py; ~2.4 MB. Regenerate after adding questions.
- `README.md`, `.gitignore`.

Row schema per question object in JSON: `{category, subcategory, difficulty, question, answer, tags[]}` (id assigned at build time).

## Git / GitHub status
- Repo: **https://github.com/srai54/Questionbank** (public).
- Uploaded so far (via web UI): `.gitignore, LICENSE (Apache-2.0), README.md, build.py, gen_sql.py, schema.sql, search.py`.
- Repo layout is now FLAT (no data/ folder): the source is a single questions.json plus the scripts. Non-blocking for the app either way.
- Version-control policy decided: **track source + scripts only** (`questions.json`, `*.py`, `schema.sql`, README, .gitignore). **Do NOT track generated artifacts** (`interview_qbank.sqlite`, `interview_qbank.json`, `supabase_setup_and_seed.sql`) — they're rebuilt from `questions.json` and are already in `.gitignore`.
- NOTE: Agent could not push directly — this session's egress proxy blocks writes to repos not in the authorized set (403 policy denial), independent of any token. User must upload manually or authorize the repo as a session source. A PAT was shared in chat and user was advised to REVOKE it.

## Extend-later workflow
1. Write new questions as one or more JSON batch files in `_incoming/` (same object schema), then run `node tools/merge.js` — it applies the exact and near-duplicate guards, appends to `questions.json` and reassigns ids. Editing `questions.json` directly still works but skips the duplicate checks.
2. Run `python build.py` and `python gen_sql.py` (regenerates artifacts + Supabase seed).
3. Commit the `questions.json` change to Git.
4. Re-run the seed SQL on Supabase (script does `drop table if exists questions` then recreates — safe to re-run), OR insert only new rows for large sets.

## PENDING / next steps (not yet done)
1. **.NET search endpoint** — e.g. `GET /api/questions/search?q=&category=&page=` using Npgsql/EF Core with the FTS operator above; keyset or offset pagination; return ranked results. (Not yet written.)
2. **React search component** — search box calling that endpoint, debounced input, renders ranked Q&A. (Not yet written.)
3. User to run the seed in Supabase (SQL Editor → paste `supabase_setup_and_seed.sql` → Run) and verify `select count(*) from questions;` returns 5004.
4. To extend the bank: add entries to questions.json (same object schema), then run `python build.py` and `python gen_sql.py`, and re-run the seed in Supabase.

## Regenerating artifacts (for a future agent)
- `python build.py` → rebuilds `interview_qbank.json` (merged) + `interview_qbank.sqlite` (FTS5, local testing only).
- `python gen_sql.py` → rebuilds `supabase_setup_and_seed.sql` from the JSON.
- `python search.py "your query"` → local millisecond search over the SQLite build (uses FTS5 BM25).
- Each `questions.json` entry: `{ "category", "subcategory", "difficulty", "question", "answer", "tags": [] }` (id auto-assigned at build).

## Supabase operational notes
- Enable `pg_trgm` extension (the seed script does `create extension if not exists`).
- Connection pooling: use Supabase pooler (port **6543**, transaction mode) for serverless/autoscaling .NET, or session pooler / direct (5432) for a long-running App Service; keep Npgsql pooling on. This matters more than search tuning at scale.
- Free tier (500 MB) is ample for 1k and 30k rows.
- Redis/managed search NOT needed at this scale.
- If backend is later hosted: prefer Azure App Service/Container Apps over Render free tier (Render free tier cold-starts 30–50s).
