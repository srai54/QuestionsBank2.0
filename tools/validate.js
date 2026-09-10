#!/usr/bin/env node
/**
 * Quality gate for questions.json (or any batch file passed as an argument).
 *
 *   node tools/validate.js                 # validate questions.json
 *   node tools/validate.js _incoming/x.json
 *
 * Exits non-zero when a rule fails, so it can gate a merge.
 */
const { SOURCE, DIFFICULTIES, normalize, load, countBy } = require('./lib');

const MIN_ANSWER = 150;   // the existing bank's shortest answer is 164 chars
const MIN_QUESTION = 8;   // short coding prompts like "FizzBuzz." are legitimate

const file = process.argv[2] || SOURCE;
const rows = load(file);
const errors = [];
const warnings = [];
const seen = new Map();

rows.forEach((row, i) => {
  const where = `${file}[${i}]`;
  for (const field of ['category', 'subcategory', 'difficulty', 'question', 'answer']) {
    if (typeof row[field] !== 'string' || !row[field].trim()) errors.push(`${where}: missing ${field}`);
  }
  if (!Array.isArray(row.tags) || row.tags.length === 0) errors.push(`${where}: missing tags`);
  if (row.difficulty && !DIFFICULTIES.has(row.difficulty)) errors.push(`${where}: bad difficulty "${row.difficulty}"`);
  if (row.question && row.question.length < MIN_QUESTION) errors.push(`${where}: question too short`);
  if (row.answer && row.answer.length < MIN_ANSWER) errors.push(`${where}: answer too short (${row.answer.length} chars): ${String(row.question).slice(0, 60)}`);

  const key = normalize(row.question);
  if (seen.has(key)) errors.push(`${where}: duplicate of row ${seen.get(key)}: ${String(row.question).slice(0, 70)}`);
  else seen.set(key, i);

  if (row.answer && row.answer.length > 900) warnings.push(`${where}: unusually long answer (${row.answer.length} chars)`);
});

console.log(`rows: ${rows.length}`);
for (const [cat, n] of countBy(rows, 'category')) console.log(`  ${cat}: ${n}`);
console.log(`difficulty: ${countBy(rows, 'difficulty').map(([k, v]) => `${k}=${v}`).join(' ')}`);

if (warnings.length) {
  console.log(`\nwarnings: ${warnings.length}`);
  warnings.slice(0, 10).forEach(w => console.log('  ' + w));
}

if (errors.length) {
  console.error(`\nFAILED: ${errors.length} error(s)`);
  errors.slice(0, 40).forEach(e => console.error('  ' + e));
  process.exit(1);
}
console.log('\nOK');
