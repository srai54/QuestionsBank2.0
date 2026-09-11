#!/usr/bin/env node
/**
 * Prints a question the way it is meant to be read, rather than as the escaped
 * one-line JSON string it is stored as.
 *
 *   node tools/show.js 1561              # by id
 *   node tools/show.js "detect a cycle"  # by text match
 *   node tools/show.js 1561 --cs > x.cs  # just the C#, to open in an editor
 */
const { SOURCE, load } = require('./lib');

const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const csOnly = process.argv.includes('--cs');
const term = args.join(' ');
if (!term) { console.error('usage: node tools/show.js <id | text>'); process.exit(2); }

const rows = load(SOURCE);
const match = /^\d+$/.test(term)
  ? rows.find(r => r.id === Number(term))
  : rows.find(r => r.question.toLowerCase().includes(term.toLowerCase()));

if (!match) { console.error(`no question matching "${term}"`); process.exit(1); }

if (csOnly) {
  const code = /```csharp\n([\s\S]*?)```/.exec(match.answer);
  if (!code) { console.error(`id ${match.id} has no C# yet`); process.exit(1); }
  process.stdout.write(code[1]);
  process.exit(0);
}

console.log(`id ${match.id}  [${match.category} / ${match.subcategory}]  ${match.difficulty}`);
console.log(`\n${match.question}\n`);
console.log(match.answer);
if (match.followups?.length) {
  console.log(`\n--- follow-ups (${match.followups.length}) ---\n`);
  match.followups.forEach((f, i) => console.log(`${i + 1}. ${f.q}\n   ${f.a}\n`));
}
