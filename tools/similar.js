#!/usr/bin/env node
/**
 * Near-duplicate detector. Exact-text dedupe misses questions that ask the same
 * thing in different words, which is the real risk when bulk-authoring.
 *
 *   node tools/similar.js _incoming/005.json        # batch vs questions.json + other batches
 *   node tools/similar.js --self                    # questions.json against itself
 *   node tools/similar.js _incoming/005.json 0.5    # custom threshold
 *
 * Compares Jaccard overlap of significant word sets, so wording order does not
 * matter. Exits non-zero when anything is at or above the threshold.
 */
const path = require('path');
const { SOURCE, load, incomingFiles, normalize } = require('./lib');

const STOP = new Set(['what', 'is', 'the', 'a', 'an', 'and', 'or', 'of', 'in', 'to', 'for', 'how', 'do', 'does', 'you', 'your', 'why', 'when', 'it', 'its', 'are', 'with', 'on', 'at', 'by', 'from', 'that', 'this', 'these', 'those', 'be', 'can', 'would', 'should', 'their', 'them', 'they', 'as', 'vs', 'versus', 'between', 'difference', 'differences', 'use', 'using', 'used', 'work', 'works', 'explain', 'describe', 'which', 'not', 'if', 'but', 'so', 'into', 'about', 'over', 'than', 'then', 'there', 'each', 'have', 'has']);

function tokens(question) {
  return new Set(normalize(question).split(' ').filter(w => w.length > 2 && !STOP.has(w)));
}

function jaccard(a, b) {
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
}

const args = process.argv.slice(2);
const self = args.includes('--self');
const target = args.find(a => a.endsWith('.json'));
const threshold = Number(args.find(a => !isNaN(Number(a)) && a !== '')) || 0.6;

const existing = load(SOURCE).map(r => ({ question: r.question, where: 'questions.json', tokens: tokens(r.question) }));

let candidates;
if (self) {
  candidates = existing;
} else {
  const files = target ? [target] : incomingFiles();
  candidates = files.flatMap(f => load(f).map((r, i) => ({ question: r.question, where: `${f}[${i}]`, tokens: tokens(r.question) })));
}

// Other batches count as "existing" too, so two batches cannot both add the same question.
const pool = self ? [] : incomingFiles()
  .filter(f => path.resolve(f) !== path.resolve(target))
  .flatMap(f => load(f).map((r, i) => ({ question: r.question, where: `${f}[${i}]`, tokens: tokens(r.question) })));

const haystack = [...existing, ...pool];
const hits = [];

candidates.forEach((c, ci) => {
  let best = { score: 0 };
  const compareTo = self ? existing.slice(ci + 1) : haystack;
  for (const h of compareTo) {
    const score = jaccard(c.tokens, h.tokens);
    if (score > best.score) best = { score, other: h };
  }
  if (best.score >= threshold) hits.push({ score: best.score, c, other: best.other });
});

hits.sort((a, b) => b.score - a.score);
console.log(`compared ${candidates.length} question(s), threshold ${threshold}`);
for (const h of hits) {
  console.log(`\n${h.score.toFixed(2)}  ${h.c.where}\n   NEW: ${h.c.question}\n   OLD: ${h.other.question}  (${h.other.where})`);
}
console.log(hits.length ? `\n${hits.length} near-duplicate(s)` : '\nno near-duplicates');
process.exit(hits.length ? 1 : 0);
