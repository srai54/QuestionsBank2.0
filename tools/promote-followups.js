#!/usr/bin/env node
/** Normalize standalone nested follow-ups into top-level searchable questions. */
const fs = require('fs');
const path = require('path');
const { ROOT, SOURCE, normalize, load } = require('./lib');

const PLAN = {
  'C#/.NET': 1150, 'Coding': 1000, 'Azure': 750, 'Architecture': 580,
  'SQL': 560, 'DevOps': 520, 'React': 500, 'AI/LLM': 480, 'Angular': 460,
  'Security': 420, 'Testing': 410, 'System Design': 400, 'CS Fundamentals': 370,
  'JavaScript/TypeScript': 300, 'Data/BI': 290, 'Frontend': 280,
  'Databases': 250, 'Behavioral': 230, 'Observability': 210, 'MongoDB': 200,
  'Python': 200, 'REST APIs': 190, 'Java': 130, 'Performance': 120,
};
const rows = load(SOURCE);
const counts = new Map();
for (const row of rows) counts.set(row.category, (counts.get(row.category) || 0) + 1);
const exact = new Set(rows.map(r => normalize(r.question)));
const selected = [];
const seen = new Set(exact);
const contextual = /\b(?:this|that|these|those|it|they|them|here|instead|also|then|same|above|previous|former|latter|your (?:answer|approach|design|solution|implementation))\b/i;
const contextualOpening = /^(?:what if|why (?:a|an|the)\b|and\b|but\b)/i;

for (const parent of rows) {
  let room = Math.max((PLAN[parent.category] || 0) - (counts.get(parent.category) || 0), 0);
  if (!room) continue;
  for (const followup of parent.followups || []) {
    if (!room) break;
    const question = String(followup.q || '').trim();
    const answer = String(followup.a || '').trim();
    const key = normalize(question);
    if (question.length < 15 || answer.length < 150 || !question.endsWith('?')) continue;
    if (contextual.test(question) || contextualOpening.test(question) || seen.has(key)) continue;
    selected.push({
      category: parent.category,
      subcategory: parent.subcategory,
      difficulty: parent.difficulty,
      question,
      answer,
      tags: [...new Set([...(parent.tags || []), 'interviewer-follow-up'])],
    });
    seen.add(key);
    counts.set(parent.category, (counts.get(parent.category) || 0) + 1);
    room--;
  }
}

const byCategory = new Map();
for (const row of selected) byCategory.set(row.category, (byCategory.get(row.category) || 0) + 1);
console.log(`eligible standalone follow-ups: ${selected.length}`);
for (const [category, count] of [...byCategory].sort((a,b) => b[1] - a[1]))
  console.log(`  ${category}: ${count}`);

if (process.argv.includes('--write')) {
  const dir = path.join(ROOT, '_incoming');
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, 'promoted-followups.json');
  fs.writeFileSync(out, JSON.stringify(selected, null, 1) + '\n', 'utf8');
  console.log(`wrote ${out}`);
}
