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

// Categories where an interviewer expects code on the whiteboard. DSA, low-level
// design and the coding parts of system design are answered in C#/.NET in this
// bank, so a fenced csharp block is expected rather than prose alone.
const NEEDS_CODE = new Set(['Coding']);
const NEEDS_CODE_SUBS = new Set(['Design', 'Concurrency']);
const hasCsharp = text => String(text || '').includes('```csharp');

// _enrich/*.json files are partial patches keyed by question text, so the
// required-field rules for a full row do not apply to them.
const patch = process.argv.includes('--patch');
const file = process.argv.find(a => a !== '--patch' && a.endsWith('.json')) || SOURCE;
const rows = load(file);
const errors = [];
const warnings = [];
const seen = new Map();

rows.forEach((row, i) => {
  const where = `${file}[${i}]`;
  const required = patch ? ['question'] : ['category', 'subcategory', 'difficulty', 'question', 'answer'];
  for (const field of required) {
    if (typeof row[field] !== 'string' || !row[field].trim()) errors.push(`${where}: missing ${field}`);
  }
  if (!patch && (!Array.isArray(row.tags) || row.tags.length === 0)) errors.push(`${where}: missing tags`);
  if (row.difficulty && !DIFFICULTIES.has(row.difficulty)) errors.push(`${where}: bad difficulty "${row.difficulty}"`);
  if (row.question && row.question.length < MIN_QUESTION) errors.push(`${where}: question too short`);
  if (row.answer && row.answer.length < MIN_ANSWER) errors.push(`${where}: answer too short (${row.answer.length} chars): ${String(row.question).slice(0, 60)}`);

  const key = normalize(row.question);
  if (seen.has(key)) errors.push(`${where}: duplicate of row ${seen.get(key)}: ${String(row.question).slice(0, 70)}`);
  else seen.set(key, i);

  // followups are the nested probes an interviewer asks after the first answer
  // ("fine - and what if the input does not fit in memory?"). Optional, but when
  // present every entry must be a real question/answer pair.
  if (row.followups !== undefined) {
    if (!Array.isArray(row.followups) || row.followups.length === 0) {
      errors.push(`${where}: followups must be a non-empty array`);
    } else {
      row.followups.forEach((f, j) => {
        if (!f || typeof f.q !== 'string' || !f.q.trim()) errors.push(`${where}.followups[${j}]: missing q`);
        if (!f || typeof f.a !== 'string' || f.a.trim().length < 80) errors.push(`${where}.followups[${j}]: answer too short`);
      });
    }
  }

  const needsCode = !patch && NEEDS_CODE.has(row.category) ||
    (row.category === 'System Design' && NEEDS_CODE_SUBS.has(row.subcategory));
  if (needsCode && !hasCsharp(row.answer)) {
    warnings.push(`${where}: no C# code block: ${String(row.question).slice(0, 60)}`);
  }

  // Code blocks and followups make answers legitimately long; only flag outliers.
  if (row.answer && row.answer.length > 4000) warnings.push(`${where}: unusually long answer (${row.answer.length} chars)`);
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
