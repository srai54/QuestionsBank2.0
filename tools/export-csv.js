#!/usr/bin/env node
/**
 * Exports questions.json as CSV for bulk loading into Supabase/Postgres.
 *
 *   node tools/export-csv.js            # writes questions.csv
 *   node tools/export-csv.js --split 5000
 *
 * Why CSV rather than INSERT statements: at a few thousand rows the generated
 * SQL is already megabytes, and the bank is heading for 25,000+ rows with a
 * full program in many answers. COPY loads that in one pass, where pasting
 * INSERT batches into the SQL editor does not scale past a handful of files.
 *
 * Load it with either of:
 *   psql "$DATABASE_URL" -c "\copy questions(category,subcategory,difficulty,question,answer,tags,followups) from 'questions.csv' with (format csv, header true)"
 *   Supabase Dashboard -> Table Editor -> Import data from CSV
 *
 * id is omitted deliberately: the column is generated always as identity, so
 * Postgres assigns it and the JSON ids stay an authoring-side concern.
 */
const fs = require('fs');
const path = require('path');
const { ROOT, SOURCE, load } = require('./lib');

const splitIdx = process.argv.indexOf('--split');
const split = splitIdx > -1 ? Number(process.argv[splitIdx + 1]) : 0;

// RFC 4180: double the quotes, wrap every field. Newlines inside a quoted
// field are legal, which matters because every answer now contains them.
const cell = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';

const HEADER = ['category', 'subcategory', 'difficulty', 'question', 'answer', 'tags', 'followups'];

const rows = load(SOURCE);
const line = r => [
  r.category, r.subcategory, r.difficulty, r.question, r.answer,
  (r.tags || []).join(', '),
  JSON.stringify(r.followups || []),
].map(cell).join(',');

function write(file, subset) {
  fs.writeFileSync(file, HEADER.map(cell).join(',') + '\n' + subset.map(line).join('\n') + '\n', 'utf8');
  const mb = (fs.statSync(file).size / 1048576).toFixed(2);
  console.log(`${path.basename(file)}: ${subset.length} rows, ${mb} MB`);
}

if (split > 0) {
  for (let i = 0, part = 1; i < rows.length; i += split, part++)
    write(path.join(ROOT, `questions_${String(part).padStart(2, '0')}.csv`), rows.slice(i, i + split));
} else {
  write(path.join(ROOT, 'questions.csv'), rows);
}
