// Shared helpers for the question-bank tooling.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'questions.json');
const INCOMING = path.join(ROOT, '_incoming');

const DIFFICULTIES = new Set(['Easy', 'Medium', 'Hard']);

/** Normalized form used for duplicate detection: case/punctuation insensitive. */
function normalize(question) {
  return String(question || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function load(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/** Writes the array in the repo's existing format: JSON, one-space indent. */
function writeSource(rows) {
  fs.writeFileSync(SOURCE, JSON.stringify(rows, null, 1) + '\n', 'utf8');
}

function incomingFiles() {
  if (!fs.existsSync(INCOMING)) return [];
  return fs.readdirSync(INCOMING)
    .filter(f => f.endsWith('.json'))
    .sort()
    .map(f => path.join(INCOMING, f));
}

function countBy(rows, key) {
  const counts = new Map();
  for (const row of rows) counts.set(row[key], (counts.get(row[key]) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

module.exports = { ROOT, SOURCE, INCOMING, DIFFICULTIES, normalize, load, writeSource, incomingFiles, countBy };
