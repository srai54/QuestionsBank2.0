#!/usr/bin/env node
/**
 * Applies enrichment patches from _enrich/*.json onto questions.json.
 *
 *   node tools/enrich.js [--dry]
 *
 * Existing questions are rewritten in place rather than re-authored, so the
 * ids, ordering and duplicate guarantees of the bank are untouched. A patch is
 * matched to its row by normalized question text:
 *
 *   { "question": "Two Sum: given an array ...",   // must already exist
 *     "answer":   "...replacement answer...",      // optional
 *     "followups": [ { "q": "...", "a": "..." } ]  // optional
 *   }
 *
 * Patching by text (not id) keeps batches stable even though merge.js
 * reassigns ids 1..N on every merge.
 */
const fs = require('fs');
const path = require('path');
const { ROOT, SOURCE, normalize, load, writeSource } = require('./lib');

const dry = process.argv.includes('--dry');
const DIR = path.join(ROOT, '_enrich');

const rows = load(SOURCE);
const byQuestion = new Map(rows.map((r, i) => [normalize(r.question), i]));

const files = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter(f => f.endsWith('.json')).sort().map(f => path.join(DIR, f))
  : [];

if (!files.length) {
  console.log('_enrich/ is empty - nothing to apply');
  process.exit(0);
}

let applied = 0, addedCode = 0, addedFollowups = 0;
const missing = [];

for (const file of files) {
  const name = path.basename(file);
  const patches = load(file);
  let hits = 0;

  for (const patch of patches) {
    const i = byQuestion.get(normalize(patch.question));
    if (i === undefined) { missing.push(`${name}: no such question: ${patch.question.slice(0, 70)}`); continue; }

    const row = rows[i];
    if (patch.answer) {
      if (patch.answer.includes('```csharp') && !String(row.answer).includes('```csharp')) addedCode++;
      row.answer = patch.answer;
    }
    if (patch.followups) {
      if (!row.followups) addedFollowups++;
      row.followups = patch.followups;
    }
    if (patch.difficulty) row.difficulty = patch.difficulty;
    if (patch.tags) row.tags = patch.tags;
    hits++; applied++;
  }
  console.log(`${name}: ${hits}/${patches.length} applied`);
}

console.log(`\napplied ${applied} patches  (+${addedCode} with code, +${addedFollowups} newly nested)  unmatched ${missing.length}`);
missing.forEach(m => console.log('  ' + m));

const withCode = rows.filter(r => String(r.answer).includes('```csharp')).length;
const withFollowups = rows.filter(r => Array.isArray(r.followups)).length;
console.log(`\nbank: ${rows.length} rows | ${withCode} with C# code | ${withFollowups} with followups`);

if (dry) {
  console.log('\n--dry: questions.json not written');
} else {
  writeSource(rows.map((r, i) => ({ ...r, id: i + 1 })));
  for (const file of files) fs.unlinkSync(file);
  console.log('\nwrote data/*.json, cleared _enrich/');
}
