const fs = require('fs');
const { SOURCE, normalize, load, writeSource } = require('D:/QuestionBankCode/tools/lib');

const tags = JSON.parse(fs.readFileSync('D:/QuestionBankCode/tools/tags-dsa.json', 'utf8'));
delete tags._comment;

const dry = process.argv.includes('--dry');
const rows = load(SOURCE);

let tagged = 0, noCompanies = 0;
const unmatched = [];

for (const [fragment, [difficulty, companies]] of Object.entries(tags)) {
  const key = normalize(fragment);
  const row = rows.find(r => normalize(r.question).startsWith(key) && !r.companies);

  if (!row) { unmatched.push(fragment); continue; }

  row.difficulty = difficulty;
  if (companies.length > 0) { row.companies = companies; tagged++; }
  else noCompanies++;   // competitive-programming: difficulty only, no invented tags
}

console.log(`tagged ${tagged} with companies, ${noCompanies} difficulty-only (competitive programming)`);
if (unmatched.length) {
  console.log(`\n${unmatched.length} fragment(s) matched nothing:`);
  unmatched.forEach(f => console.log('  ' + f));
}

const all = rows.filter(r => r.category === 'Coding' && r.companies);
const d = {};
all.forEach(r => d[r.difficulty] = (d[r.difficulty] || 0) + 1);
console.log(`\nDSA questions with company tags: ${all.length}`);
console.log('  ' + JSON.stringify(d));

if (dry) console.log('\n--dry: not written');
else { writeSource(rows); console.log('\nwrote data/*.json'); }
