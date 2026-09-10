#!/usr/bin/env node
/**
 * Prints what a category already covers, so new questions don't repeat it.
 *
 *   node tools/coverage.js "C#/.NET"        # every existing question in that category
 *   node tools/coverage.js                  # per-category counts vs the 5,000 plan
 */
const { load, SOURCE, countBy } = require('./lib');

// Target plan for 10,000 questions: deepen the established categories and add
// adjacent areas that appear in the same interviews.
const PLAN = {
  // established
  'C#/.NET': 1000, 'Coding': 900, 'Azure': 650, 'Architecture': 500, 'SQL': 480,
  'DevOps': 450, 'React': 430, 'AI/LLM': 420, 'Angular': 400, 'Security': 360,
  'Testing': 350, 'System Design': 350, 'CS Fundamentals': 320, 'JavaScript/TypeScript': 250,
  'Data/BI': 250, 'Frontend': 240, 'Databases': 220, 'Behavioral': 200,
  'Observability': 180, 'MongoDB': 170, 'REST APIs': 160,
  // adjacent
  'Python': 250, 'AWS': 200, 'Docker/Linux': 180, 'Kafka': 150, 'Java': 150,
  'Agile/Process': 150, 'Performance': 150, 'Terraform/IaC': 130, 'GraphQL': 120,
  'Mobile': 120, 'Networking': 120, 'Search': 100, 'Product': 100, 'Scripting': 94,
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
