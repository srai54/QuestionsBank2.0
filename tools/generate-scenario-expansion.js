#!/usr/bin/env node
/**
 * Generate applied scenario questions until every category reaches PLAN.
 * Each scenario is grounded in a different reviewed source answer where possible.
 */
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
const STOP = new Set(['what','which','when','where','with','from','into','does','this','that','these','those','have','about','your','their','difference','between','explain','describe','work','works','using','used','should','would','could','there','than','then','they','them','such','each','more','most','some','over','under','why','how','and','the','for','are','not','can','you','its']);
const MERGE_STOP = new Set(['what','is','the','a','an','and','or','of','in','to','for','how','do','does','you','your','why','when','it','its','are','with','on','at','by','from','that','this','these','those','be','can','would','should','their','them','they','as','vs','versus','between','difference','differences','use','using','used','work','works','explain','describe','which','not','if','but','so','into','about','over','than','then','there','each','have','has']);
const tokenize = q => new Set(normalize(q).split(' ').filter(w => w.length > 2 && !MERGE_STOP.has(w)));
const jaccard = (a,b) => { let n=0; for (const w of a) if (b.has(w)) n++; return n/(a.size+b.size-n || 1); };

const contexts = [
  'a production incident', 'a design review', 'a migration rehearsal',
  'a capacity-planning exercise', 'a security review', 'a failed deployment',
  'a multi-tenant service', 'a high-latency user journey', 'an intermittent failure',
  'a regulated-data workflow', 'a dependency outage', 'a cost-reduction review',
  'a disaster-recovery exercise', 'a large-data workload', 'a global rollout',
  'a backward-compatibility review', 'an on-call investigation', 'a performance regression',
  'a gradual rollout', 'a concurrency bug', 'a data-quality incident',
  'a reliability review', 'a privacy assessment', 'a legacy-system integration',
];
const decisions = [
  'identify the evidence needed before choosing an approach',
  'separate the primary failure mechanism from secondary symptoms',
  'design a safe experiment that tests the most important assumption',
  'choose an implementation and explain its operational tradeoffs',
  'define a rollback boundary and objective success criteria',
  'diagnose the issue without masking it with retries or extra capacity',
  'validate correctness before attempting to optimize the implementation',
  'decide what to measure at the component and user-facing boundaries',
  'reduce risk while preserving the required behavior',
  'explain the decision to reviewers who did not build the original system',
  'test the relevant edge cases and failure paths',
  'define ownership, observability, and recovery for the resulting design',
];
const constraints = [
  'keeping the change reversible', 'protecting tail latency',
  'preserving data integrity', 'avoiding hidden shared state',
  'limiting blast radius', 'maintaining backward compatibility',
  'respecting a fixed resource budget', 'supporting partial failure',
  'preventing sensitive-data exposure', 'keeping behavior deterministic',
  'handling retries and duplicate delivery', 'making the result independently testable',
];
const lenses = {
  'Azure': 'Check Azure service limits, identity and network boundaries, regional failure behavior, platform metrics, and the exact deployment configuration.',
  'Architecture': 'Make component ownership, consistency boundaries, failure propagation, coupling, and evolutionary cost explicit before selecting a pattern.',
  'SQL': 'Use the actual execution plan, row estimates, data distribution, transaction scope, blocking, and index maintenance cost as evidence.',
  'DevOps': 'Verify artifact identity, environment differences, rollout health, rollback behavior, permissions, and the signal that will stop the deployment.',
  'React': 'Measure renders and user interactions, verify state ownership and effect cleanup, and test stale, loading, error, and accessibility states.',
  'AI/LLM': 'Use a versioned evaluation set, trace retrieval and tool calls, validate structured outputs, and track quality, latency, safety, and cost together.',
  'Angular': 'Check component ownership, change detection, subscription cleanup, routing state, template behavior, and user-visible loading and error paths.',
  'Security': 'Build a threat model, validate every trust boundary, apply least privilege, protect secrets and audit data, and test abuse as well as normal use.',
  'Testing': 'State the behavior under test, control nondeterministic dependencies, keep the failure diagnostic, and add integration coverage where mocks omit the real contract.',
  'System Design': 'Quantify load and failure objectives, identify the consistency boundary, bound queues and retries, and define observability and recovery before scaling.',
  'CS Fundamentals': 'State the invariant and complexity assumptions, test boundary inputs, and distinguish the abstract model from runtime and hardware costs.',
  'JavaScript/TypeScript': 'Check runtime values as well as static types, event-loop ordering, resource cleanup, browser compatibility, and rejection or cancellation paths.',
  'Data/BI': 'Confirm grain, lineage, freshness, late-arriving data, reconciliation rules, access controls, and how corrections propagate to reports.',
  'Frontend': 'Measure the complete user journey, main-thread and network work, responsive and accessible behavior, and recovery from partial or stale data.',
  'Databases': 'Evaluate workload shape, data distribution, isolation, durability, indexing, backup recovery, and behavior during failover or contention.',
  'Observability': 'Define the decision each signal supports, preserve correlation and cardinality controls, protect sensitive fields, and test telemetry during overload.',
  'MongoDB': 'Use real document shapes and query plans, check index selectivity and shard targeting, and define consistency, retry, and schema-evolution behavior.',
  'REST APIs': 'Make HTTP semantics, validation, idempotency, authorization, pagination, caching, error contracts, and version compatibility explicit.',
  'C#/.NET': 'Verify runtime ownership, disposal and cancellation, async and allocation behavior, dependency lifetimes, and observable failure semantics.',
  'Coding': 'State the invariant, prove termination and complexity, cover boundary cases, and verify the implementation with representative examples.',
};

const rows = load(SOURCE);
const counts = new Map();
for (const row of rows) counts.set(row.category, (counts.get(row.category) || 0) + 1);
const index = new Map();
for (const row of rows) {
  if (!index.has(row.category)) index.set(row.category, []);
  index.get(row.category).push(tokenize(row.question));
}
const candidates = [];

function topicFor(row) {
  const parts = [];
  for (const word of normalize(row.question).split(' '))
    if (word.length > 3 && !STOP.has(word)) parts.push(word);
  for (const tag of row.tags || []) {
    const text = String(tag).replace(/[-_]+/g, ' ').trim();
    if (text.length > 2 && !['interview','scenario practice','interviewer follow up'].includes(text.toLowerCase())) parts.push(text);
  }
  return [...new Set(parts)].slice(0, 7).join(', ') || row.subcategory.toLowerCase();
}

for (const [category, target] of Object.entries(PLAN)) {
  const deficit = Math.max(target - (counts.get(category) || 0), 0);
  if (!deficit) continue;
  const sources = rows.filter(row => row.category === category &&
    !(row.tags || []).includes('interviewer-follow-up') &&
    !(row.tags || []).includes('scenario-practice') &&
    String(row.answer).length <= 3200 &&
    (category !== 'Coding' || String(row.answer).includes('```csharp')) &&
    !(category === 'System Design' && ['Design','Concurrency'].includes(row.subcategory) && !String(row.answer).includes('```csharp')));
  if (!sources.length) throw new Error(`No scenario sources for ${category}`);
  let made = 0;
  for (let attempt = 0; made < deficit && attempt < deficit * 200; attempt++) {
    const source = sources[attempt % sources.length];
    const cycle = Math.floor(attempt / sources.length);
    const context = contexts[(attempt * 5 + cycle) % contexts.length];
    const decision = decisions[(attempt * 7 + cycle * 3) % decisions.length];
    const constraint = constraints[(attempt * 11 + cycle * 5) % constraints.length];
    const topic = topicFor(source);
    const question = `During ${context} involving ${source.subcategory.toLowerCase()} concerns around ${topic}, how would you ${decision} while ${constraint}?`;
    const tokens = tokenize(question);
    let collision = false;
    for (const other of index.get(category) || [])
      if (jaccard(tokens, other) >= 0.6) { collision = true; break; }
    if (!collision) {
      for (const [otherCategory, questions] of index) {
        if (otherCategory === category) continue;
        for (const other of questions) {
          if (jaccard(tokens, other) >= 0.85) { collision = true; break; }
        }
        if (collision) break;
      }
    }
    if (collision) continue;
    const lens = lenses[category] || 'Verify assumptions with representative evidence, make tradeoffs explicit, and define failure handling and measurable success criteria.';
    const answer = `Start with the underlying technical principle: ${source.answer}\n\nFor the applied scenario, ${lens} ${constraint[0].toUpperCase() + constraint.slice(1)} should be an explicit acceptance criterion. Record the assumptions, test a representative failure path, and compare the result with a baseline before making the change broadly available.`;
    candidates.push({
      category, subcategory: `Applied ${source.subcategory}`,
      difficulty: source.difficulty === 'Easy' ? 'Medium' : source.difficulty,
      question, answer,
      tags: [...new Set([...(source.tags || []), 'scenario-practice', 'applied'])],
    });
    if (!index.has(category)) index.set(category, []);
    index.get(category).push(tokens);
    made++;
  }
  if (made !== deficit) throw new Error(`${category}: generated ${made}/${deficit}`);
  console.log(`${category}: ${made}`);
}

const outDir = path.join(ROOT, '_incoming');
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'scenario-expansion.json');
fs.writeFileSync(out, JSON.stringify(candidates, null, 1) + '\n', 'utf8');
console.log(`total: ${candidates.length}; wrote ${out}`);
