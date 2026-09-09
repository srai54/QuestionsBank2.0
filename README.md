# Interview Question Bank (553 Q&A so far — target 1000)

A searchable interview-prep question bank covering .NET, Angular, React, SQL/SP optimization,
Azure (Entra ID, APIM, Redis, Service Bus, Logic Apps, Functions, Blob, Hangfire), MongoDB,
microservices, event-driven, Semantic Kernel/AI agents, REST, auth/security, testing, CI/CD,
Docker/K8s, logging/monitoring, Clean Architecture & SOLID, Power BI/SSIS/ETL, JS/TS, system
design and behavioral.

## Files
- `interview_qbank.sqlite` — SQLite DB with an **FTS5 full-text index** for millisecond search.
- `interview_qbank.json` — same data as a JSON array (id, category, subcategory, difficulty, question, answer, tags).
- `search.py` — CLI: `python3 search.py "redis eviction policy"` (add `--cat Azure`, `--limit 20`).
- `build.py` — recompiles the DB + merged JSON from `questions.json`.
- `questions.json` — the source content: a single JSON array of all questions (edit this to add/change questions).

## Millisecond search (SQLite FTS5)
Any human or LLM can query it instantly. Examples:

```sql
-- Top matches ranked by relevance (BM25):
SELECT q.category, q.question, q.answer
FROM questions_fts
JOIN questions q ON q.id = questions_fts.rowid
WHERE questions_fts MATCH 'index optimization sargable'
ORDER BY bm25(questions_fts)
LIMIT 10;

-- Filter by category:
SELECT question, answer FROM questions WHERE category = 'Azure';

-- Search within a category:
SELECT q.question FROM questions_fts
JOIN questions q ON q.id = questions_fts.rowid
WHERE questions_fts MATCH 'circuit breaker' AND q.category = 'Architecture';
```

FTS5 uses the `porter unicode61` tokenizer (stemming), so "optimizing" matches "optimize".
Use plain keywords (not "x vs y" phrases) for best recall.

## Schema
`questions(id, category, subcategory, difficulty, question, answer, tags)`
plus `questions_fts` (FTS5 over question, answer, tags, category, subcategory).

## Regenerate / extend
Add or edit entries in `questions.json`, then run `python3 build.py`.
