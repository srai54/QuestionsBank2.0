#!/usr/bin/env node
/**
 * Escapes raw newlines that slipped inside JSON string literals in a batch file.
 *
 *   node tools/fixjson.js _enrich/016-lld-a.json
 *
 * Hand-authored batches occasionally end up with a literal newline inside a
 * string, which is illegal JSON and fails with an unhelpful offset. This walks
 * the text tracking string state and escapes them, then confirms it parses.
 */
const fs = require('fs');

const file = process.argv[2];
if (!file) { console.error('usage: node tools/fixjson.js <file.json>'); process.exit(2); }

const source = fs.readFileSync(file, 'utf8');
const BACKSLASH = String.fromCharCode(92);

let out = '', inString = false, escaped = false, fixed = 0;

for (const c of source) {
  if (escaped) { out += c; escaped = false; continue; }
  if (c === BACKSLASH) { out += c; escaped = true; continue; }
  if (c === '"') { inString = !inString; out += c; continue; }
  if (inString && c === '\n') { out += BACKSLASH + 'n'; fixed++; continue; }
  if (inString && c === '\r') { fixed++; continue; }
  out += c;
}

fs.writeFileSync(file, out);

try {
  console.log(`${file}: escaped ${fixed} raw newline(s), parses as ${JSON.parse(out).length} entries`);
} catch (e) {
  console.error(`${file}: still invalid - ${e.message}`);
  process.exit(1);
}
