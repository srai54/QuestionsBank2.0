const assert = require('node:assert/strict');
const { validateRows } = require('./validate');
const valid = {
  category: 'Testing', subcategory: 'Validation', difficulty: 'Medium',
  question: 'How should invalid question batches be rejected?',
  answer: 'Validate all entries before writing any source file. Preserve the incoming batch when validation fails so the author can correct it, and report the exact field and row that violated the schema.',
  tags: ['validation'],
};
assert.equal(validateRows([valid]).errors.length, 0);
for (const invalid of [null, {}, [null], [42], [{...valid, tags: [null]}], [{...valid, answer: 'Short'}], [{...valid, difficulty: 'Unknown'}], [{...valid, followups: [{q:'Why?', a:'Short'}]}]]) {
  assert.ok(validateRows(invalid).errors.length > 0, JSON.stringify(invalid));
}
assert.ok(validateRows([valid, {...valid, question: valid.question.toUpperCase()}]).errors.some(e => e.includes('duplicate')));
console.log('Validation regression checks passed.');
