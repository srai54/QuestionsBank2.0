import json
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
  search tsvector generated always as (
    setweight(to_tsvector('english', coalesce(question,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(tags,'')),     'B') ||
    setweight(to_tsvector('english', coalesce(answer,'')),   'C') ||
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
cols = "(category, subcategory, difficulty, question, answer, tags)"
for i in range(0, len(rows), B):
    chunk = rows[i:i+B]
    lines.append(f"insert into questions {cols} values")
    vals = []
    for r in chunk:
        tags = ", ".join(r.get("tags", []))
        vals.append(f"  ('{esc(r.get('category'))}', '{esc(r.get('subcategory'))}', '{esc(r.get('difficulty'))}', '{esc(r.get('question'))}', '{esc(r.get('answer'))}', '{esc(tags)}')")
    lines.append(",\n".join(vals) + ";")
lines.append("")
lines.append("-- Done. Quick test:")
lines.append("--   select id, category, question")
lines.append("--   from questions")
lines.append("--   where search @@ websearch_to_tsquery('english', 'redis eviction')")
lines.append("--   order by ts_rank_cd(search, websearch_to_tsquery('english','redis eviction')) desc")
lines.append("--   limit 10;")
lines.append("")

open("supabase_setup_and_seed.sql", "w", encoding="utf-8").write("\n".join(lines))
print("rows:", len(rows))
print("wrote supabase_setup_and_seed.sql")
