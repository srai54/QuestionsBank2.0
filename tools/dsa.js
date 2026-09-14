#!/usr/bin/env node
/**
 * Browse the DSA questions by difficulty and by the companies they are
 * commonly reported at.
 *
 *   node tools/dsa.js                    # counts by difficulty
 *   node tools/dsa.js Easy               # list the Easy questions
 *   node tools/dsa.js --company Google   # questions reported at Google
 *   node tools/dsa.js Hard --company Facebook
 *
 * The company data is crowdsourced and unverified - see tools/companies.js.
 * Note that Amazon is reported for nearly every common problem, so filtering
 * on it tells you little; the discriminating tags are the smaller ones.
 */
const { SOURCE, load } = require('./lib');

const args = process.argv.slice(2);
const companyIndex = args.indexOf('--company');
const company = companyIndex > -1 ? args[companyIndex + 1] : null;
const level = args.find(a => ['Easy', 'Medium', 'Hard'].includes(a));

const rows = load(SOURCE).filter(r => r.category === 'Coding' && r.companies);

let selected = rows;
if (level) selected = selected.filter(r => r.difficulty === level);
if (company) selected = selected.filter(r =>
  r.companies.some(c => c.toLowerCase() === company.toLowerCase()));

if (!level && !company) {
  console.log('DSA questions with difficulty and commonly-reported companies\n');

  for (const l of ['Easy', 'Medium', 'Hard']) {
    const inLevel = rows.filter(r => r.difficulty === l);
    console.log(`  ${l.padEnd(7)} ${inLevel.length}`);
  }

  const byCompany = new Map();
  for (const r of rows) for (const c of r.companies) byCompany.set(c, (byCompany.get(c) || 0) + 1);

  console.log('\n  company           questions   (Amazon covers nearly all, so it is low signal)');
  for (const [c, n] of [...byCompany].sort((a, b) => b[1] - a[1]))
    console.log(`  ${c.padEnd(18)} ${n}`);

  console.log('\n  node tools/dsa.js Easy --company Google');
  process.exit(0);
}

const heading = [level, company && `reported at ${company}`].filter(Boolean).join(', ');
console.log(`${selected.length} question(s) - ${heading}\n`);

for (const r of selected)
  console.log(`  [${r.difficulty.padEnd(6)}] ${r.question.slice(0, 62).padEnd(64)} ${r.companies.join(', ')}`);
