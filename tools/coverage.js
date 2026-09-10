#!/usr/bin/env node
/**
 * Prints what a category already covers, so new questions don't repeat it.
 *
 *   node tools/coverage.js "C#/.NET"        # every existing question in that category
 *   node tools/coverage.js                  # per-category counts vs the 5,000 plan
 */
const { load, SOURCE, countBy } = require('./lib');

const PLAN = {
  'C#/.NET': 660, 'Coding': 430, 'Azure': 430, 'Architecture': 330, 'SQL': 330,
  'DevOps': 280, 'React': 280, 'Angular': 260, 'AI/LLM': 260, 'Security': 200,
  'Testing': 200, 'CS Fundamentals': 180, 'JavaScript/TypeScript': 160, 'Data/BI': 150,
  'System Design': 150, 'REST APIs': 130, 'Frontend': 130, 'MongoDB': 120,
  'Behavioral': 120, 'Observability': 100, 'Databases': 100,
};

const rows = load(SOURCE);
const category = process.argv[2];

if (category) {
  const inCat = rows.filter(r => r.category === category);
  console.log(`${category}: ${inCat.length} existing`);
  inCat.forEach(r => console.log(`- [${r.subcategory}] ${r.question}`));
  process.exit(0);
}

const have = new Map(countBy(rows, 'category'));
let remaining = 0;
console.log('category                       have  target  todo');
for (const [cat, target] of Object.entries(PLAN).sort((a, b) => b[1] - a[1])) {
  const n = have.get(cat) || 0;
  const todo = Math.max(target - n, 0);
  remaining += todo;
  console.log(`${cat.padEnd(28)} ${String(n).padStart(5)} ${String(target).padStart(7)} ${String(todo).padStart(5)}`);
}
console.log(`\ntotal ${rows.length} / 5000 - ${remaining} to write`);
