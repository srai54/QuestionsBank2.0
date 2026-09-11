import json
import os
# Read the built aggregate, which build.py produces from data/*.json with ids
# assigned. Run build.py first.
import glob
_data = sorted(glob.glob(os.path.join("data", "*.json")))
if _data:
    rows = []
    for _f in _data:
        rows.extend(json.load(open(_f, encoding="utf-8")))
elif os.path.exists("questions.json"):
    rows = json.load(open("questions.json", encoding="utf-8"))
else:
    rows = json.load(open("interview_qbank.json", encoding="utf-8"))

def esc(s):
    if s is None: return ''
    return str(s).replace("'", "''")

schema = """-- ============================================================
-- Interview Question Bank - Supabase / PostgreSQL setup
-- Run this ONCE in the Supabase SQL Editor (paste + Run).
-- ============================================================

-- 1) Extensions (typo-tolerance + prefix search). Safe to re-run.
create extension if not exists pg_trgm;

-- 2) Table with an auto-generated full-text search column
drop table if exists questions cascade;
create table questions (
  id          bigint generated always as identity primary key,
  category    text,
  subcategory text,
  difficulty  text,
  question    text not null,
  answer      text not null,
  tags        text,
  followups   jsonb not null default '[]'::jsonb,
  search tsvector generated always as (
    setweight(to_tsvector('english', coalesce(question,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(tags,'')),     'B') ||
    setweight(to_tsvector('english', coalesce(answer,'')),   'C') ||
    setweight(to_tsvector('english', coalesce(followups::text,'')), 'C') ||
    setweight(to_tsvector('english', coalesce(category,'')), 'D')
  ) stored
);

-- 3) Indexes: GIN for full-text, trigram for fuzzy/prefix, plus filters
create index questions_search_idx on questions using gin(search);
create index questions_trgm_idx   on questions using gin(question gin_trgm_ops);
create index questions_cat_idx    on questions(category);
create index questions_diff_idx   on questions(difficulty);

-- 4) Seed data
"""

lines = [schema]
# batched multi-row inserts (200 rows per statement)
B = 200
cols = "(category, subcategory, difficulty, question, answer, tags, followups)"
for i in range(0, len(rows), B):
    chunk = rows[i:i+B]
    lines.append(f"insert into questions {cols} values")
    vals = []
    for r in chunk:
        tags = ", ".join(r.get("tags", []))
        followups = json.dumps(r.get("followups", []), ensure_ascii=False)
        vals.append(f"  ('{esc(r.get('category'))}', '{esc(r.get('subcategory'))}', '{esc(r.get('difficulty'))}', '{esc(r.get('question'))}', '{esc(r.get('answer'))}', '{esc(tags)}', '{esc(followups)}'::jsonb)")
    lines.append(",\n".join(vals) + ";")
lines.append("")
lines.append("-- Done. Quick test:")
lines.append("--   select id, category, question")
lines.append("--   from questions")
lines.append("--   where search @@ websearch_to_tsquery('english', 'redis eviction')")
lines.append("--   order by ts_rank_cd(search, websearch_to_tsquery('english','redis eviction')) desc")
lines.append("--   limit 10;")
lines.append("")

# The Supabase SQL editor rejects very large pastes, and with a full C#
# program in every answer the seed runs to several megabytes. So write the
# schema once and split the inserts across numbered files of MAX_BYTES each,
# to be run in filename order. Re-running is safe: the schema drops first.
MAX_BYTES = 700_000

open("supabase_01_schema.sql", "w", encoding="utf-8").write(schema)

part, buf, size, written = 1, [], 0, 0
for stmt in lines[1:]:
    buf.append(stmt)
    size += len(stmt)
    if size >= MAX_BYTES:
        part += 1
        open(f"supabase_{part:02d}_seed.sql", "w", encoding="utf-8").write("\n".join(buf))
        written += 1
        buf, size = [], 0
if buf:
    part += 1
    open(f"supabase_{part:02d}_seed.sql", "w", encoding="utf-8").write("\n".join(buf))
    written += 1

# Single-file version as well, for loading through psql rather than the editor.
open("supabase_setup_and_seed.sql", "w", encoding="utf-8").write("\n".join(lines))
print("rows:", len(rows))
print(f"wrote supabase_01_schema.sql + {written} seed file(s); run them in filename order")
print("also wrote supabase_setup_and_seed.sql (single file, for psql)")
