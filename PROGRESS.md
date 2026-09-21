# 10,000-question completion — September 18, 2026

> Correction, September 21, 2026: this is a historical record of a generated
> expansion, not evidence of 10,000 independently authored questions. The user
> rejected that result. The restarted question-only list is at 1,500 / 10,000:
> see `question-list/README.md` and batches 001–003 in `question-list/`.

The bank contains exactly **10,000 top-level questions** across 24 categories.
Every category matches the target in `tools/coverage.js`.

## Expansion composition

- Original checkout: 5,756 top-level questions.
- Individually authored additions: 373 questions, including Performance,
  Python, Java, Behavioral, and other targeted material.
- Normalized nested content: 1,178 context-independent interviewer follow-ups
  were promoted to top-level searchable questions. Their nested copies were
  removed, so this does not duplicate the same Q&A in both locations.
- Applied scenario expansion: 2,693 questions. These are deterministic
  production, design, migration, security, testing, and failure-mode scenarios
  grounded in distinct reviewed source answers. They carry the
  `scenario-practice` tag and intentionally reuse the relevant technical core
  while asking a different applied question.

The 4,244 additions passed the repository's schema and answer-length gates.
Incoming rows were compared against existing and earlier accepted rows with a
0.6 same-category Jaccard threshold and a stricter 0.85 cross-category check.
Those checks reduce obvious overlap; they are not a substitute for a complete
human factual and semantic review.

## Repairs completed

- Fixed the missing comma that prevented SQLite from creating `companies`.
- Added the company column to the standalone PostgreSQL schema.
- SQL export splitting keeps INSERT statements intact and measures UTF-8 bytes.
- Merge validates incoming batches before modifying source files.
- Corrected comparison behavior at the exact similarity threshold.
- Corrected the category plan from 10,010 to 10,000.
- Replaced the unrelated Deno workflow with Node/Python validation and builds.
- Updated documentation for the actual `data/*.json` source layout.

## Verification

- Whole-bank schema validation: passed, 10,000 rows.
- Coverage plan: 10,000/10,000 with zero category deficits.
- Validation regression checks: passed.
- Python regression tests: 2 passed, including SQLite metadata/FTS round trip.
- JSON and SQLite generation: passed.
- Supabase SQL generation: passed; no live database execution was performed.
- SQLite row count and integrity, FTS search, SQL chunk integrity, and preserved
  baseline question text are checked while packaging the deliverable.

## Remaining editorial backlog

- 631 non-blocking validation warnings: 581 coding/design answers lack C# code
  blocks and 50 answers exceed 4,000 characters.
- 770 questions retain nested follow-ups.
- A conservative full-bank similarity audit at 0.75 reports 20 candidate
  cross-category or legacy pairs for human review; the report is included with
  the deliverable. Automated deletion is inappropriate because several are
  valid technology-specific variants.
- Company associations are crowdsourced and not verified interview records.
- Version-sensitive technical answers and executable code require ongoing review.
- Scenario-practice entries should be sampled during editorial review because
  they are structured derivations, not independent claims of new source material.

Changes are local. Nothing has been pushed to GitHub or imported into Supabase.
