// Shared helpers for the question-bank tooling.
//
// The source of truth is data/<category>.json, one file per category, rather
// than a single questions.json. At 5,000 rows one file was merely large; the
// bank is heading for 25,000+ with a full C# program in many answers, which
// projects to roughly 36 MB and 800,000 lines. Splitting keeps each file
// openable, keeps a batch's diff confined to the categories it touched, and
// lets two people add questions to different areas without conflicting.
//
// Source rows carry NO id. Ids are assigned at build time (build.py numbers
// them 1..N), so nothing in the source has to be renumbered when a row is
// added - which is what previously made every batch rewrite the whole file.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const INCOMING = path.join(ROOT, '_incoming');
const LEGACY = path.join(ROOT, 'questions.json');

// Kept so existing callers can keep passing SOURCE around; it names the data
// directory rather than a single file.
const SOURCE = DATA;

const DIFFICULTIES = new Set(['Easy', 'Medium', 'Hard']);

/** Normalized form used for duplicate detection: case/punctuation insensitive. */
function normalize(question) {
  return String(question || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** A category becomes a filename: "C#/.NET" -> "csharp-dotnet". */
function categoryToFile(category) {
  return String(category || 'general')
    .toLowerCase()
    .replace(/#/g, 'sharp')
    .replace(/\+/g, 'plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'general';
}

function dataFiles() {
  if (!fs.existsSync(DATA)) return [];
  return fs.readdirSync(DATA).filter(f => f.endsWith('.json')).sort()
    .map(f => path.join(DATA, f));
}

/**
 * Reads the bank. With no argument (or with SOURCE) it concatenates every
 * data file in a stable order; with a path it reads that single file, which
 * is how batches in _incoming and patches in _enrich are loaded.
 */
function load(file) {
  if (file && file !== SOURCE && fs.statSync(file).isFile())
    return JSON.parse(fs.readFileSync(file, 'utf8'));

  const files = dataFiles();
  if (files.length === 0 && fs.existsSync(LEGACY))
    return JSON.parse(fs.readFileSync(LEGACY, 'utf8'));   // pre-split fallback

  const rows = [];
  for (const f of files) rows.push(...JSON.parse(fs.readFileSync(f, 'utf8')));
  return rows;
}

/** Writes the bank back out, one file per category, ids stripped. */
function writeSource(rows) {
  fs.mkdirSync(DATA, { recursive: true });

  const byCategory = new Map();
  for (const row of rows) {
    const { id, ...rest } = row;          // ids belong to the build, not the source
    const key = categoryToFile(row.category);
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key).push(rest);
  }

  // Remove files whose category no longer has any rows, so a rename does not
  // leave a stale file behind that load() would silently pick up.
  for (const existing of dataFiles())
    if (!byCategory.has(path.basename(existing, '.json'))) fs.unlinkSync(existing);

  for (const [key, subset] of byCategory)
    fs.writeFileSync(path.join(DATA, `${key}.json`), JSON.stringify(subset, null, 1) + '\n', 'utf8');
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

module.exports = {
  ROOT, DATA, SOURCE, INCOMING, DIFFICULTIES,
  normalize, categoryToFile, load, writeSource, dataFiles, incomingFiles, countBy,
};
