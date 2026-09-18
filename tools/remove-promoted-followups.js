#!/usr/bin/env node
/** Remove nested copies of follow-ups that now exist as top-level rows. */
const { SOURCE, normalize, load, writeSource } = require('./lib');
const rows = load(SOURCE);
const topLevel = new Set(rows.map(row => normalize(row.question)));
let removed = 0;
for (const row of rows) {
  if (!Array.isArray(row.followups)) continue;
  const remaining = row.followups.filter(followup => {
    const promoted = topLevel.has(normalize(followup.q));
    if (promoted) removed++;
    return !promoted;
  });
  if (remaining.length) row.followups = remaining;
  else delete row.followups;
}
writeSource(rows);
console.log(`removed ${removed} nested copies of promoted top-level questions`);
