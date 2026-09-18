# Interview Question Bank

**10,000 top-level Q&A across 24 categories. Target reached.**
Nested follow-ups are not counted as additional top-level questions.

Source content lives in `data/*.json`, one JSON array per category. Source rows
have no IDs; the build assigns IDs in file order. Rebuilding after additions
can change IDs. The bank covers .NET, Angular, React, Azure, SQL, architecture,
testing, security, AI, coding, and related interview topics.

## Build and search

Requires Python 3.9+ with SQLite FTS5 and Node.js 18+ for authoring tools.
Run commands from the repository root:

```sh
node tools/validate.js
node tools/coverage.js
python build.py
python gen_sql.py
python search.py 'queue' --cat Performance --limit 5
```

`build.py` produces `interview_qbank.json` and `interview_qbank.sqlite`.
`gen_sql.py` produces `supabase_01_schema.sql`, numbered seed files, and
`supabase_setup_and_seed.sql`. Generated outputs are ignored by Git.
The older tracked `supabase_setup_and_seed_1.sql` is a historical export;
regenerate the current seed instead of relying on its contents.

**The generated Supabase schema drops and recreates the questions table.**
Use it only for an intentional full replacement after preserving needed data.
Run the numbered files in order, or use the single file with `psql`.
Generation alone does not modify a live database. SQL files have not been
executed against a live PostgreSQL instance in this update.

For CSV import, use `node tools/export-csv.js`. Company labels in existing
content are crowdsourced associations, not verified interview records.

## Authoring

Write complete entries in `_incoming/*.json` with `category`, `subcategory`,
`difficulty`, `question`, `answer`, and a nonempty `tags` array. Difficulty
must be `Easy`, `Medium`, or `Hard`; answers must contain at least 150 characters.
Optional `followups` entries have `q` and `a` fields; follow-up answers must
contain at least 80 characters. Coding and selected system-design answers are
checked for C# code fences. Structural checks do not prove factual correctness.

```sh
node tools/validate.js _incoming/my-batch.json
node tools/merge.js --dry
node tools/merge.js
python build.py
python gen_sql.py
```

Merge validates every batch before writing. It rejects normalized exact
duplicates and token-overlap near duplicates (0.6 within a category, 0.85
across categories). Review dry-run output: rejected rows are not merged,
and a successful non-dry merge clears incoming batches. Keep authoring backups.
Semantic duplicates can still escape this heuristic.

## Verification

```sh
node tools/test-validation.js
python -m unittest discover -s tests
node tools/validate.js
node tools/similar.js --self 0.75
```

Current full-bank validation passes with 631 warnings: 581 coding/design
answers without C# blocks and 50 long answers. These are warnings because the
underlying prose may still be useful, but they remain an editorial backlog.
Existing answers and code have not all been independently reverified. See
`PROGRESS.md` for the expansion method and current verification status.

## Production search

Use PostgreSQL full-text search through a backend API:

```sql
select id, category, question, answer
from questions
where search @@ websearch_to_tsquery('english', $1)
order by ts_rank_cd(search, websearch_to_tsquery('english', $1)) desc
limit 20;
```

The generated schema supplies a GIN index on `search`. Latency depends on
hardware, load, query selectivity, and deployment; benchmark your workload.
