#!/usr/bin/env node
// Validate explicitly authored lists; this script never generates questions.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { load, normalize } = require('./lib');
const root = path.resolve(__dirname, '..');
const directory = path.join(root, 'question-list');
const files = fs.readdirSync(directory).filter(f => /^batch-\d{3}\.md$/.test(f)).sort();
const seen = new Map();
const legacy = new Set(load().map(r => normalize(r.question)));
const report = { total: 0, batches: [], exactLegacyOverlap: [] };
let expected = 1;
for (const file of files) {
  const text = fs.readFileSync(path.join(directory, file), 'utf8');
  const questions = [...text.matchAll(/^(\d+)\. (.+)$/gm)]
    .map(([, number, question]) => ({ number: Number(number), question: question.trim() }));
  assert.equal(questions.length, 500, `${file} must contain exactly 500 questions`);
  for (const { number, question } of questions) {
    assert.equal(number, expected++, `${file}: non-contiguous numbering`);
    assert.ok(question.endsWith('?'), `Question ${number} must end with a question mark`);
    const key = normalize(question);
    assert.ok(!seen.has(key), `Duplicate questions ${seen.get(key)} and ${number}`);
    seen.set(key, number);
    if (legacy.has(key)) report.exactLegacyOverlap.push({ number, question });
  }
  report.total += questions.length;
  report.batches.push({ file, count: questions.length, first: questions[0].number, last: questions.at(-1).number });
}
assert.ok(report.total > 0, 'No batches found');
console.log(JSON.stringify(report, null, 2));
console.log('Numbering, batch sizes, and normalized exact-duplicate checks passed.');
console.log('These checks do not certify factual accuracy or semantic novelty.');
