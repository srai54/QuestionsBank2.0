#!/usr/bin/env node
/**
 * Merges every _incoming/*.json batch into questions.json.
 *
 *   node tools/merge.js [--dry] [--threshold 0.6]
 *
 * Two guards run before a row is accepted:
 *   1. exact duplicate of an existing (or earlier-in-this-run) question
 *   2. near duplicate - Jaccard overlap of significant words at or above the
 *      threshold, which catches the same question asked in different words
 * Rejected rows are reported and dropped, so batch files are never edited by
 * hand. Ids are reassigned 1..N so the file stays consistent with build.py.
 */
const fs = require('fs');
const { SOURCE, normalize, load, writeSource, incomingFiles, countBy } = require('./lib');

const dry = process.argv.includes('--dry');
const tIndex = process.argv.indexOf('--threshold');
const THRESHOLD = tIndex > -1 ? Number(process.argv[tIndex + 1]) : 0.6;

const STOP = new Set(['what', 'is', 'the', 'a', 'an', 'and', 'or', 'of', 'in', 'to', 'for', 'how', 'do', 'does', 'you', 'your', 'why', 'when', 'it', 'its', 'are', 'with', 'on', 'at', 'by', 'from', 'that', 'this', 'these', 'those', 'be', 'can', 'would', 'should', 'their', 'them', 'they', 'as', 'vs', 'versus', 'between', 'difference', 'differences', 'use', 'using', 'used', 'work', 'works', 'explain', 'describe', 'which', 'not', 'if', 'but', 'so', 'into', 'about', 'over', 'than', 'then', 'there', 'each', 'have', 'has']);

const tokenize = q => new Set(normalize(q).split(' ').filter(w => w.length > 2 && !STOP.has(w)));

function jaccard(a, b) {
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
}

const existing = load(SOURCE);
const exact = new Map(existing.map((r, i) => [normalize(r.question), `questions.json[${i}]`]));
const index = existing.map(r => ({ question: r.question, tokens: tokenize(r.question) }));

const added = [];
const rejected = [];

for (const file of incomingFiles()) {
  const name = file.split(/[\\/]/).pop();
  const batch = load(file);
  let kept = 0;

  batch.forEach((row, i) => {
    const where = `${name}[${i}]`;
    const key = normalize(row.question);

    if (exact.has(key)) {
      rejected.push({ where, reason: `exact duplicate of ${exact.get(key)}`, question: row.question });
      return;
    }

    const tokens = tokenize(row.question);
    let best = { score: 0 };
    for (const other of index) {
      const score = jaccard(tokens, other.tokens);
      if (score > best.score) best = { score, other };
    }
    if (best.score >= THRESHOLD) {
      rejected.push({ where, reason: `${best.score.toFixed(2)} similar to: ${best.other.question}`, question: row.question });
      return;
    }

    exact.set(key, where);
    index.push({ question: row.question, tokens });
    added.push({
      category: row.category,
      subcategory: row.subcategory,
      difficulty: row.difficulty,
      question: row.question,
      answer: row.answer,
      tags: row.tags,
    });
    kept++;
  });

  console.log(`${name}: ${kept}/${batch.length} kept`);
}

const merged = [...existing, ...added].map((row, i) => ({ ...row, id: i + 1 }));

console.log(`\nexisting ${existing.length} + new ${added.length} = ${merged.length}   rejected ${rejected.length}`);
rejected.forEach(r => console.log(`  drop ${r.where}: ${r.reason}\n       ${r.question}`));
console.log('');
for (const [cat, n] of countBy(merged, 'category')) console.log(`  ${cat}: ${n}`);

if (dry) {
  console.log('\n--dry: questions.json not written');
} else {
  writeSource(merged);
  for (const file of incomingFiles()) fs.unlinkSync(file);
  console.log(`\nwrote questions.json (${merged.length} rows), cleared _incoming/`);
}
