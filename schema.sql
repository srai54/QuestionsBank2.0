-- Database structure for the interview question bank (Supabase / PostgreSQL).
-- This is the schema only (no data). Run once; seed separately.
create extension if not exists pg_trgm;

create table if not exists questions (
  id          bigint generated always as identity primary key,
  category    text,
  subcategory text,
  difficulty  text,
  question    text not null,
  answer      text not null,
  tags        text,
  -- nested interviewer follow-ups: [{ "q": ..., "a": ... }]
  followups   jsonb not null default '[]'::jsonb,
  search tsvector generated always as (
    setweight(to_tsvector('english', coalesce(question,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(tags,'')),     'B') ||
    setweight(to_tsvector('english', coalesce(answer,'')),   'C') ||
    setweight(to_tsvector('english', coalesce(followups::text,'')), 'C') ||
    setweight(to_tsvector('english', coalesce(category,'')), 'D')
  ) stored
);
create index if not exists questions_search_idx on questions using gin(search);
create index if not exists questions_trgm_idx   on questions using gin(question gin_trgm_ops);
create index if not exists questions_cat_idx    on questions(category);
create index if not exists questions_diff_idx   on questions(difficulty);
