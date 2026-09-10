# Interview Question Bank (5,004 Q&A)

A searchable interview-prep question bank covering .NET, Angular, React, SQL/SP optimization,
Azure (Entra ID, APIM, Redis, Service Bus, Logic Apps, Functions, Blob, AKS, Cosmos DB), MongoDB,
microservices, event-driven architecture, RAG/AI agents, REST, auth/security, testing, CI/CD,
Docker/K8s, observability, Clean Architecture & SOLID, Power BI/SSIS/ETL, JS/TS, system design,
coding problems and behavioural questions.

## Files

**Source (tracked)**
- `questions.json` — the source of truth: a single JSON array of all questions. Edit this to add or change content.
- `build.py` — compiles `questions.json` into the SQLite FTS5 DB and merged JSON.
- `gen_sql.py` — generates `supabase_setup_and_seed.sql` (schema + indexes + all INSERTs).
- `schema.sql` — schema-only migration (structure and indexes, no data).
- `search.py` — CLI for local millisecond search over the SQLite build.
- `tools/` — Node authoring pipeline for adding questions in bulk (see below).

**Generated (gitignored, rebuild with the scripts)**
- `interview_qbank.sqlite` — SQLite DB with an FTS5 full-text index.
- `interview_qbank.json` — the same data as a merged array with ids.
- `supabase_setup_and_seed.sql` — the file to run in the Supabase SQL editor.

## Quick start

```bash
python build.py                      # rebuild the SQLite DB + merged JSON
python gen_sql.py                    # rebuild the Supabase seed script
python search.py "redis eviction"    # search locally (add --cat Azure, --limit 20)
```

Requires Python 3.9+ and, for the authoring tools, Node 18+.

## Adding questions

Batches are written as JSON files in `_incoming/` and merged with automatic quality checks,
rather than edited into `questions.json` by hand.

```bash
node tools/coverage.js                    # per-category counts against the target plan
node tools/coverage.js "C#/.NET"          # list what a category already covers
# write one or more batches into _incoming/*.json
node tools/validate.js _incoming/x.json   # schema, answer length, exact duplicates
node tools/merge.js --dry                 # preview what would be added or rejected
node tools/merge.js                       # merge, reassign ids, clear _incoming/
python build.py && python gen_sql.py      # regenerate artifacts
```

`merge.js` applies two guards before accepting a row:

1. **Exact duplicate** — normalised question text already present.
2. **Near duplicate** — Jaccard overlap of significant words at or above a threshold
   (default 0.6). This is the important one: exact-text dedupe misses the same question
   asked in different words, which is the main quality risk when adding rows in bulk.

`tools/similar.js` runs the near-duplicate check on its own, including `--self` to audit
`questions.json` against itself.

Each entry has this shape (`id` is assigned at build time):

```json
{
  "category": "C#/.NET",
  "subcategory": "EF Core",
  "difficulty": "Easy | Medium | Hard",
  "question": "...",
  "answer": "...",
  "tags": ["efcore", "performance"]
}
```

## Millisecond search (SQLite FTS5)

Any human or LLM can query the local build instantly:

```sql
-- Top matches ranked by relevance (BM25):
SELECT q.category, q.question, q.answer
FROM questions_fts
JOIN questions q ON q.id = questions_fts.rowid
WHERE questions_fts MATCH 'index optimization sargable'
ORDER BY bm25(questions_fts)
LIMIT 10;

-- Search within a category:
SELECT q.question FROM questions_fts
JOIN questions q ON q.id = questions_fts.rowid
WHERE questions_fts MATCH 'circuit breaker' AND q.category = 'Architecture';
```

FTS5 uses the `porter unicode61` tokenizer (stemming), so "optimizing" matches "optimize".
Use plain keywords rather than "x vs y" phrases for best recall.

## Production search (PostgreSQL on Supabase)

The intended production path is PostgreSQL full-text search with a GIN index, queried through
a .NET API. Run `supabase_setup_and_seed.sql` in the Supabase SQL editor — it drops and
recreates the table, so it is safe to re-run after regenerating.

The .NET query **must** use the FTS operator so it hits the index:

```sql
where search @@ websearch_to_tsquery('english', @q)
```

In EF Core: `x.Search.Matches(EF.Functions.WebSearchToTsQuery("english", q))`.
Do **not** use `LIKE '%...%'` or `.Contains()` — that bypasses the index and falls back to a
sequential scan.

## Schema

`questions(id, category, subcategory, difficulty, question, answer, tags)` plus `questions_fts`
(FTS5 over question, answer, tags, category, subcategory) locally, and a generated `tsvector`
column with GIN and trigram indexes on PostgreSQL.
