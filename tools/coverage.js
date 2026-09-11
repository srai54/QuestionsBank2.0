#!/usr/bin/env node
/**
 * Prints what a category already covers, so new questions don't repeat it.
 *
 *   node tools/coverage.js "C#/.NET"        # every existing question in that category
 *   node tools/coverage.js                  # per-category counts vs the 5,000 plan
 */
const { load, SOURCE, countBy } = require('./lib');

// Target plan for 10,000 questions, scoped to the stack this bank is for:
// .NET, Angular, React, Azure, SQL/Mongo and the surrounding practice areas.
// No AWS or Kafka - deliberately out of scope.
const PLAN = {
  'C#/.NET': 1150, 'Coding': 1000, 'Azure': 750, 'Architecture': 580, 'SQL': 560,
  'DevOps': 520, 'React': 500, 'AI/LLM': 480, 'Angular': 460, 'Security': 420,
  'Testing': 410, 'System Design': 400, 'CS Fundamentals': 370, 'JavaScript/TypeScript': 300,
  'Data/BI': 290, 'Frontend': 280, 'Databases': 250, 'Behavioral': 230,
  'Observability': 210, 'MongoDB': 200, 'REST APIs': 190, 'Python': 200,
  'Java': 130, 'Performance': 130,
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
console.log(`\ntotal ${rows.length} / 10000 - ${remaining} to write`);

// Depth, not just count: how much of the bank is ready for the way an
// interviewer actually probes - nested follow-ups, and C# code where the
// question is a coding, low-level-design or algorithm question.
const needsCode = rows.filter(r => r.category === 'Coding' ||
  (r.category === 'System Design' && ['Design', 'Concurrency'].includes(r.subcategory)));
const withCode = needsCode.filter(r => String(r.answer).includes('```csharp'));
const nested = rows.filter(r => Array.isArray(r.followups) && r.followups.length);
console.log(`nested  ${nested.length} / ${rows.length} questions have follow-ups - ${rows.length - nested.length} to deepen`);
console.log(`code    ${withCode.length} / ${needsCode.length} coding/LLD answers have C# - ${needsCode.length - withCode.length} to write`);
