# Restarted interview question list

Current authored count: **500 / 10,000**. Remaining: **9,500**.

The earlier generated dataset is not counted toward this list. Each batch
contains 500 individually written question prompts. There are no answers in
these files; the legacy answered bank and its builders remain separate.

| Batch | Range | Count | File |
| --- | --- | --- | --- |
| 001 | 1–500 | 500 | [Read questions](batch-001.md) |

Batch 001 retains questions 1–30 previously shared in the conversation and adds
470 questions. Topics include .NET, SQL, Azure, React, Angular, JavaScript and
TypeScript, distributed systems, security, testing, and AI applications.
The next batch starts at 501. Only a completed, checked batch is committed for
publication; future batches are not counted in advance.

Validation:

```sh
node tools/check-question-list.js
```

Batch 001 has contiguous numbering, exactly 500 prompts, no normalized exact
duplicates within the list, and no normalized exact matches to legacy question
text. These checks do not claim that every topic is absent from legacy content,
nor do they replace semantic editorial review. No placeholder questions or
topic-substitution generator is used to populate this list.
