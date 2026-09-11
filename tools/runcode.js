#!/usr/bin/env node
/**
 * Compiles and runs the C# program in each enriched answer and compares the
 * real output against the Output block the answer claims.
 *
 *   node tools/runcode.js <scratch-project-dir> [--only "substring of question"]
 *
 * An answer that prints something different from what it promises is worse
 * than an answer with no code at all, so this is the gate for that format.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { SOURCE, load } = require('./lib');

// Each run gets its own Program.cs path guard: two concurrent runs sharing one
// scratch project overwrite each other's source and produce nonsense diffs.
const proj = process.argv[2];
if (!proj) { console.error('usage: node tools/runcode.js <project-dir> [--only text]'); process.exit(2); }
const onlyIdx = process.argv.indexOf('--only');
const only = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null;

// ```csharp ... ``` followed later by an Output fence
const CODE = /```csharp\n([\s\S]*?)```/;
const OUT = /\*\*Output\*\*\n+```\n([\s\S]*?)```/;

const rows = load(SOURCE).filter(r => String(r.answer).includes('```csharp'));
const targets = only ? rows.filter(r => r.question.toLowerCase().includes(only.toLowerCase())) : rows;

let pass = 0; const fails = [];

for (const row of targets) {
  const code = CODE.exec(row.answer);
  const out = OUT.exec(row.answer);
  const label = row.question.slice(0, 64);

  if (!code) { fails.push(`${label}: no code block`); continue; }
  if (!out) { console.log(`skip (no Output block): ${label}`); continue; }

  fs.writeFileSync(path.join(proj, 'Program.cs'), code[1], 'utf8');
  let actual;
  try {
    actual = execFileSync('dotnet', ['run', '--project', proj, '-v', 'q', '--nologo'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    fails.push(`${label}: BUILD/RUN FAILED\n${String(e.stdout || '').slice(0, 600)}${String(e.stderr || '').slice(0, 600)}`);
    continue;
  }

  const norm = s => s.replace(/\r\n/g, '\n').trim();
  if (norm(actual) === norm(out[1])) { pass++; console.log(`ok   ${label}`); }
  else fails.push(`${label}: OUTPUT MISMATCH\n  expected: ${JSON.stringify(norm(out[1]))}\n  actual:   ${JSON.stringify(norm(actual))}`);
}

console.log(`\n${pass}/${targets.length} verified`);
if (fails.length) { console.log(`\n${fails.length} failure(s):`); fails.forEach(f => console.log('  ' + f + '\n')); process.exit(1); }
