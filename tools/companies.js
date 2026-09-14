#!/usr/bin/env node
/**
 * Applies difficulty and company tags to the top-200 DSA questions.
 *
 *   node tools/companies.js --dry     # report what would change
 *   node tools/companies.js           # apply
 *   node tools/companies.js --report  # browse the result by difficulty and company
 *
 * IMPORTANT about the company data
 * --------------------------------
 * These are the organisations a question is COMMONLY REPORTED to have been
 * asked at, drawn from widely circulated community lists. They are NOT
 * verified interview records, no company publishes its question bank, and any
 * given list is out of date the moment it is written. Treat them as a rough
 * signal of which questions are popular in which hiring style - big-tech
 * algorithmic, product-company practical, or service-company fundamentals -
 * rather than as fact. Anything surfacing this field to a user should label it
 * "commonly reported", not "asked at".
 *
 * Difficulty follows the standard community classification so that the Easy /
 * Medium / Hard split matches what candidates see elsewhere.
 */
const { SOURCE, normalize, load, writeSource, countBy } = require('./lib');

// question text fragment -> [difficulty, ...companies]
const TAGS = {
  // ---- Easy ----
  'Two Sum: given an array': ['Easy', 'Amazon', 'Google', 'Microsoft', 'Adobe', 'Infosys', 'TCS'],
  'Best Time to Buy and Sell Stock': ['Easy', 'Amazon', 'Microsoft', 'Bloomberg', 'Goldman Sachs'],
  'Check if a string is a palindrome': ['Easy', 'Microsoft', 'Amazon', 'Facebook', 'Wipro'],
  'Check if two strings are anagrams': ['Easy', 'Amazon', 'Bloomberg', 'Uber', 'Accenture'],
  'Valid parentheses': ['Easy', 'Amazon', 'Google', 'Microsoft', 'Facebook', 'Zoho'],
  'Reverse a singly linked list': ['Easy', 'Microsoft', 'Amazon', 'Apple', 'Adobe', 'TCS'],
  'Detect a cycle in a linked list': ['Easy', 'Amazon', 'Microsoft', 'Bloomberg', 'Infosys'],
  'Contains duplicate': ['Easy', 'Amazon', 'Apple', 'Microsoft'],
  'FizzBuzz': ['Easy', 'Amazon', 'Microsoft', 'Bloomberg', 'Cognizant', 'Capgemini'],
  'Merge two sorted linked lists': ['Easy', 'Amazon', 'Microsoft', 'Apple', 'Adobe'],
  'Maximum depth of a binary tree': ['Easy', 'Amazon', 'Google', 'LinkedIn'],
  'Invert / mirror a binary tree': ['Easy', 'Google', 'Amazon', 'Microsoft'],
  'Binary search: find a target': ['Easy', 'Amazon', 'Microsoft', 'Google', 'Infosys'],
  'Move all zeros to the end': ['Easy', 'Facebook', 'Bloomberg', 'Amazon'],
  'Find the missing number in an array containing': ['Easy', 'Amazon', 'Microsoft', 'Bloomberg'],
  'Climbing stairs': ['Easy', 'Amazon', 'Adobe', 'Apple', 'Goldman Sachs'],
  'Find the middle of a linked list': ['Easy', 'Amazon', 'Microsoft', 'TCS'],
  'Merge two sorted arrays into one sorted array in-place': ['Easy', 'Microsoft', 'Amazon', 'Facebook'],
  'Longest common prefix': ['Easy', 'Amazon', 'Adobe', 'Google'],
  'First unique character in a string': ['Easy', 'Amazon', 'Microsoft', 'Bloomberg'],
  'Check if two binary trees are identical': ['Easy', 'Amazon', 'Google'],
  'Check if a binary tree is symmetric': ['Easy', 'Amazon', 'Microsoft', 'LinkedIn'],
  'Lowest common ancestor in a BST': ['Easy', 'Amazon', 'Microsoft', 'Facebook'],
  'Diameter of a binary tree': ['Easy', 'Facebook', 'Amazon', 'Google'],
  'Check if a binary tree is height-balanced': ['Easy', 'Amazon', 'Google'],
  'Path sum: does a root-to-leaf path': ['Easy', 'Amazon', 'Microsoft'],
  'Convert a sorted array to a height-balanced BST': ['Easy', 'Amazon', 'Google'],
  'Min stack': ['Easy', 'Amazon', 'Bloomberg', 'Google', 'Goldman Sachs'],
  'Remove duplicates from a sorted linked list': ['Easy', 'Amazon', 'Microsoft'],
  'Implement a stack using two queues': ['Easy', 'Microsoft', 'Amazon', 'Bloomberg'],
  'Plus one: increment a number': ['Easy', 'Google', 'Amazon'],
  'Two Sum II (sorted input)': ['Easy', 'Amazon', 'Bloomberg'],
  'Check whether a string can be rearranged into a palindrome': ['Easy', 'Amazon', 'Uber'],
  'Valid palindrome II': ['Easy', 'Facebook', 'Amazon'],
  'Isomorphic strings': ['Easy', 'LinkedIn', 'Amazon', 'Google'],
  "Word pattern: does a string of words": ['Easy', 'Amazon', 'Uber', 'Dropbox'],
  'Check if one string is a rotation of another': ['Easy', 'Amazon', 'Microsoft', 'TCS'],
  'Check if a string has all unique characters': ['Easy', 'Amazon', 'Microsoft', 'Infosys'],
  'Implement a function to check whether one string is a subsequence': ['Easy', 'Google', 'Amazon'],
  'Add binary': ['Easy', 'Facebook', 'Amazon'],
  'Convert an integer to a Roman numeral': ['Easy', 'Amazon', 'Microsoft', 'Adobe', 'Twitter'],
  'Count and Say': ['Easy', 'Facebook', 'Amazon'],
  'Count the number of set bits': ['Easy', 'Amazon', 'Microsoft', 'Apple'],
  'Single number: find the element that appears once': ['Easy', 'Amazon', 'Airbnb', 'Palantir'],
  'Counting bits': ['Easy', 'Amazon', 'Facebook'],
  'Reverse the bits of a 32-bit integer': ['Easy', 'Apple', 'Amazon', 'Microsoft'],
  'Determine whether a number is a power of two': ['Easy', 'Amazon', 'Google'],
  'Count primes up to n': ['Easy', 'Amazon', 'Microsoft', 'Capital One'],
  'Greatest common divisor': ['Easy', 'Amazon', 'Microsoft'],
  'Happy number': ['Easy', 'Amazon', 'Uber', 'Twitter'],
  'Excel column number to title': ['Easy', 'Microsoft', 'Amazon', 'Facebook'],
  'Shuffle an array uniformly at random': ['Easy', 'Amazon', 'Google', 'Microsoft'],
  'Count trailing zeroes in n factorial': ['Easy', 'Bloomberg', 'Amazon'],
  'Flood fill': ['Easy', 'Amazon', 'Google', 'Facebook'],
  'Find the maximum sum of any k consecutive elements': ['Easy', 'Amazon', 'Infosys'],
  'Number of connected components in an undirected graph': ['Easy', 'Google', 'Amazon', 'Twitter'],
  'Find all elements that appear more than n/3 times': ['Easy', 'Amazon', 'Google'],
  'Find the majority element': ['Easy', 'Amazon', 'Adobe', 'Google'],
  'Longest substring without repeating characters': ['Medium', 'Amazon', 'Bloomberg', 'Adobe', 'Microsoft'],

  // ---- Medium ----
  "Maximum Subarray (Kadane's algorithm)": ['Medium', 'Amazon', 'Microsoft', 'LinkedIn', 'Goldman Sachs'],
  'Product of Array Except Self': ['Medium', 'Amazon', 'Facebook', 'Microsoft', 'Apple'],
  'Number of islands': ['Medium', 'Amazon', 'Google', 'Microsoft', 'Facebook', 'Bloomberg'],
  'Group anagrams together': ['Medium', 'Amazon', 'Facebook', 'Uber', 'Bloomberg'],
  'Longest palindromic substring': ['Medium', 'Amazon', 'Microsoft', 'Adobe', 'Wayfair'],
  'Binary tree level order traversal': ['Medium', 'Amazon', 'Microsoft', 'Facebook', 'LinkedIn'],
  'Validate a binary search tree': ['Medium', 'Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
  'Coin change: fewest coins': ['Medium', 'Amazon', 'Google', 'Uber', 'Goldman Sachs'],
  '3Sum: find all unique triplets': ['Medium', 'Amazon', 'Facebook', 'Adobe', 'Microsoft'],
  'Container With Most Water': ['Medium', 'Amazon', 'Facebook', 'Bloomberg'],
  'Search in a rotated sorted array': ['Medium', 'Amazon', 'Facebook', 'Microsoft', 'LinkedIn'],
  'Remove the nth node from the end': ['Medium', 'Amazon', 'Facebook', 'Microsoft'],
  'Add two numbers represented as linked lists': ['Medium', 'Amazon', 'Microsoft', 'Bloomberg', 'Adobe'],
  'Check if a linked list is a palindrome': ['Medium', 'Amazon', 'Facebook', 'Microsoft'],
  'Find the kth largest element in an array': ['Medium', 'Amazon', 'Facebook', 'LinkedIn', 'Bloomberg'],
  'Top K frequent elements': ['Medium', 'Amazon', 'Facebook', 'Uber', 'Yelp'],
  'Insert Interval / Merge Intervals': ['Medium', 'Amazon', 'Facebook', 'Google', 'Bloomberg'],
  'Meeting rooms II': ['Medium', 'Amazon', 'Google', 'Facebook', 'Bloomberg'],
  'Rotate an array to the right by k steps': ['Medium', 'Amazon', 'Microsoft', 'Bloomberg'],
  'Reverse words in a string': ['Medium', 'Amazon', 'Microsoft', 'Apple'],
  'String to integer (atoi)': ['Medium', 'Amazon', 'Microsoft', 'Bloomberg', 'Facebook'],
  'Implement strStr': ['Medium', 'Amazon', 'Microsoft', 'Facebook'],
  'Longest consecutive sequence': ['Medium', 'Amazon', 'Google', 'Facebook'],
  'Subarray sum equals k': ['Medium', 'Amazon', 'Facebook', 'Google'],
  'Sort colors (Dutch national flag)': ['Medium', 'Amazon', 'Microsoft', 'Facebook'],
  'Lowest common ancestor in a binary tree (not BST)': ['Medium', 'Amazon', 'Facebook', 'Microsoft', 'LinkedIn'],
  'Binary tree in-order/pre-order/post-order traversal': ['Medium', 'Amazon', 'Microsoft', 'Bloomberg'],
  'Kth smallest element in a BST': ['Medium', 'Amazon', 'Facebook', 'Bloomberg'],
  'Right side view of a binary tree': ['Medium', 'Amazon', 'Facebook', 'Bloomberg'],
  'Construct a binary tree from preorder and inorder': ['Medium', 'Amazon', 'Microsoft', 'Bloomberg'],
  'Flatten a binary tree to a linked list': ['Medium', 'Amazon', 'Microsoft', 'Facebook'],
  'Implement a Trie': ['Medium', 'Amazon', 'Google', 'Microsoft', 'Twitter'],
  'Clone a graph': ['Medium', 'Amazon', 'Facebook', 'Google', 'Uber'],
  'Course schedule: can you finish all courses': ['Medium', 'Amazon', 'Facebook', 'Google', 'Uber'],
  'Course schedule II': ['Medium', 'Amazon', 'Facebook', 'Google'],
  'Rotting oranges': ['Medium', 'Amazon', 'Google', 'Microsoft'],
  "Surrounded regions": ['Medium', 'Amazon', 'Google'],
  "Dijkstra's shortest path": ['Medium', 'Amazon', 'Google', 'Uber'],
  'Detect a cycle in an undirected graph (Union-Find)': ['Medium', 'Amazon', 'Google'],
  'Is a graph a valid tree': ['Medium', 'Google', 'Amazon', 'LinkedIn'],
  'Check if a graph is bipartite': ['Medium', 'Amazon', 'Facebook', 'Google'],
  'Pacific Atlantic water flow': ['Medium', 'Amazon', 'Google'],
  'House robber': ['Medium', 'Amazon', 'Google', 'LinkedIn'],
  'Longest increasing subsequence': ['Medium', 'Amazon', 'Microsoft', 'Facebook', 'Goldman Sachs'],
  'Longest common subsequence': ['Medium', 'Amazon', 'Google', 'Microsoft'],
  'Unique paths in an m': ['Medium', 'Amazon', 'Google', 'Bloomberg'],
  'Minimum path sum in a grid': ['Medium', 'Amazon', 'Google', 'Goldman Sachs'],
  'Word break: can a string be segmented': ['Medium', 'Amazon', 'Facebook', 'Google', 'Uber'],
  'Decode ways': ['Medium', 'Amazon', 'Facebook', 'Microsoft', 'Uber'],
  '0/1 knapsack': ['Medium', 'Amazon', 'Microsoft', 'Samsung'],
  'Partition equal subset sum': ['Medium', 'Amazon', 'Facebook', 'Google'],
  'Coin change II': ['Medium', 'Amazon', 'Google'],
  'Maximal square': ['Medium', 'Amazon', 'Facebook', 'Google'],
  'Jump game: can you reach the last index': ['Medium', 'Amazon', 'Microsoft', 'Facebook'],
  'Jump game II': ['Medium', 'Amazon', 'Facebook', 'Google'],
  'Generate all subsets': ['Medium', 'Amazon', 'Facebook', 'Bloomberg'],
  'Generate all permutations': ['Medium', 'Amazon', 'Microsoft', 'LinkedIn'],
  'Combination sum': ['Medium', 'Amazon', 'Facebook', 'Uber'],
  'Letter combinations of a phone number': ['Medium', 'Amazon', 'Facebook', 'Google', 'Uber'],
  'Generate valid parentheses combinations': ['Medium', 'Amazon', 'Google', 'Uber'],
  'Word search in a grid (single word)': ['Medium', 'Amazon', 'Microsoft', 'Facebook', 'Bloomberg'],
  'Palindrome partitioning': ['Medium', 'Amazon', 'Facebook', 'Bloomberg'],
  'Find all anagrams of a pattern': ['Medium', 'Amazon', 'Facebook', 'Uber'],
  'Longest repeating character replacement': ['Medium', 'Amazon', 'Google'],
  'Permutation in string': ['Medium', 'Amazon', 'Microsoft', 'Yandex'],
  'Maximum number of consecutive ones III': ['Medium', 'Amazon', 'Facebook'],
  'Find first and last position of a target': ['Medium', 'Amazon', 'Facebook', 'LinkedIn'],
  'Find minimum in a rotated sorted array': ['Medium', 'Amazon', 'Microsoft', 'Goldman Sachs'],
  'Find peak element': ['Medium', 'Amazon', 'Google', 'Microsoft'],
  'Search a 2D matrix': ['Medium', 'Amazon', 'Microsoft', 'Bloomberg'],
  'Koko eating bananas': ['Medium', 'Amazon', 'Google', 'Facebook'],
  'Find the square root of an integer': ['Medium', 'Amazon', 'Bloomberg', 'Facebook'],
  'Explain and implement quicksort': ['Medium', 'Amazon', 'Microsoft', 'Infosys', 'TCS'],
  'Explain and implement merge sort': ['Medium', 'Amazon', 'Microsoft', 'Adobe', 'Wipro'],
  'Quickselect': ['Medium', 'Amazon', 'Facebook', 'Google'],
  'Find the k closest points to the origin': ['Medium', 'Amazon', 'Facebook', 'LinkedIn'],
  'Task scheduler': ['Medium', 'Amazon', 'Facebook', 'Uber'],
  'Reorganize a string': ['Medium', 'Amazon', 'Facebook', 'Google'],
  'Evaluate Reverse Polish Notation': ['Medium', 'Amazon', 'LinkedIn', 'Bloomberg'],
  'Daily temperatures': ['Medium', 'Amazon', 'Facebook', 'Bloomberg'],
  'Next greater element for each element': ['Medium', 'Amazon', 'Bloomberg'],
  "Decode a string like": ['Medium', 'Amazon', 'Google', 'Bloomberg'],
  'Implement a circular queue': ['Medium', 'Amazon', 'Microsoft'],
  'Asteroid collision': ['Medium', 'Amazon', 'Google', 'Uber'],
  'Simplify a Unix-style absolute path': ['Medium', 'Facebook', 'Amazon', 'Microsoft'],
  'Reorder a linked list': ['Medium', 'Amazon', 'Facebook', 'Microsoft'],
  'Find the intersection node of two singly linked lists': ['Medium', 'Amazon', 'Microsoft', 'Bloomberg'],
  'Copy a linked list with random pointers': ['Medium', 'Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
  'Rotate a linked list to the right': ['Medium', 'Amazon', 'Microsoft', 'LinkedIn'],
  'Swap nodes in pairs': ['Medium', 'Amazon', 'Microsoft', 'Bloomberg'],
  'Sort a linked list in O(n log n)': ['Medium', 'Amazon', 'Microsoft', 'Google'],
  'Set matrix zeroes': ['Medium', 'Amazon', 'Microsoft', 'Facebook'],
  'Spiral order traversal of a matrix': ['Medium', 'Amazon', 'Microsoft', 'Google', 'Adobe'],
  'Rotate an n': ['Medium', 'Amazon', 'Microsoft', 'Apple', 'Cisco'],
  'Maximum product subarray': ['Medium', 'Amazon', 'LinkedIn', 'Google'],
  'Gas station': ['Medium', 'Amazon', 'Bloomberg', 'Google'],
  'Next permutation': ['Medium', 'Amazon', 'Google', 'Facebook'],
  'Non-overlapping intervals': ['Medium', 'Amazon', 'Facebook', 'Bloomberg'],
  'Find all duplicates in an array where every element': ['Medium', 'Amazon', 'Google'],
  'Find the duplicate number in an array of n+1': ['Medium', 'Amazon', 'Google', 'Bloomberg'],
  'Given an array of stock prices, find the maximum profit with at most two': ['Hard', 'Amazon', 'Goldman Sachs'],
  'Given prices and a fee': ['Medium', 'Amazon', 'Google'],
  'Best time to buy/sell stock with cooldown': ['Medium', 'Amazon', 'Google'],
  'Partition labels': ['Medium', 'Amazon', 'Google'],
  'Minimum number of arrows': ['Medium', 'Amazon', 'Google'],
  'Remove k digits': ['Medium', 'Amazon', 'Google', 'Snapchat'],
  'Given an array and a value, find the minimum length subarray': ['Medium', 'Amazon', 'Facebook', 'Goldman Sachs'],
  'Longest substring with at most k distinct characters': ['Medium', 'Amazon', 'Google', 'Facebook'],
  'Find the length of the longest subarray with equal numbers of zeros': ['Medium', 'Amazon', 'Facebook'],
  'Subarray sums divisible by k': ['Medium', 'Amazon', 'Twitter'],
  'Given an array, find the length of the shortest subarray that must be sorted': ['Medium', 'Amazon', 'Google'],
  'String compression': ['Medium', 'Amazon', 'Microsoft', 'Apple'],
  'Multiply two non-negative numbers given as strings': ['Medium', 'Amazon', 'Facebook', 'Microsoft'],
  'Zigzag conversion': ['Medium', 'Amazon', 'Google', 'PayPal'],
  'Encode and decode strings': ['Medium', 'Amazon', 'Google', 'Facebook'],
  'Sum of two integers without using': ['Medium', 'Amazon', 'Microsoft', 'Hulu'],
  'Pow(x, n)': ['Medium', 'Amazon', 'Facebook', 'LinkedIn', 'Bloomberg'],
  'Reverse an integer with overflow handling': ['Medium', 'Amazon', 'Bloomberg', 'Apple'],
  '01 matrix': ['Medium', 'Amazon', 'Google', 'Facebook'],
  'Valid Sudoku': ['Medium', 'Amazon', 'Apple', 'Uber'],
  'Game of Life': ['Medium', 'Amazon', 'Google', 'Dropbox'],
  'Count the number of subarrays with exactly k distinct': ['Hard', 'Amazon', 'Google'],
  'Count inversions in an array': ['Hard', 'Amazon', 'Google', 'Goldman Sachs'],

  // ---- Hard ----
  'Trapping Rain Water': ['Hard', 'Amazon', 'Google', 'Facebook', 'Goldman Sachs', 'Bloomberg'],
  'Merge k sorted linked lists': ['Hard', 'Amazon', 'Facebook', 'Google', 'Microsoft', 'Uber'],
  'Binary tree maximum path sum': ['Hard', 'Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
  'Serialize and deserialize a binary tree': ['Hard', 'Amazon', 'Facebook', 'Google', 'LinkedIn'],
  'Word ladder': ['Hard', 'Amazon', 'Facebook', 'Google', 'LinkedIn'],
  'Edit distance (Levenshtein)': ['Hard', 'Amazon', 'Google', 'Microsoft', 'Goldman Sachs'],
  'N-Queens': ['Hard', 'Amazon', 'Google', 'Adobe'],
  'Minimum window substring': ['Hard', 'Amazon', 'Facebook', 'Google', 'LinkedIn', 'Uber'],
  'Sliding window maximum': ['Hard', 'Amazon', 'Google', 'Facebook', 'Goldman Sachs'],
  'Find the median of two sorted arrays': ['Hard', 'Amazon', 'Google', 'Microsoft', 'Adobe', 'Goldman Sachs'],
  'Find the median from a data stream': ['Hard', 'Amazon', 'Google', 'Facebook', 'Microsoft'],
  'Largest rectangle in a histogram': ['Hard', 'Amazon', 'Google', 'Facebook'],
  'Basic calculator': ['Hard', 'Amazon', 'Google', 'Facebook', 'Microsoft'],
  'Longest valid parentheses': ['Hard', 'Amazon', 'Google', 'Facebook'],
  'Reverse nodes in k-group': ['Hard', 'Amazon', 'Facebook', 'Microsoft'],
  'First missing positive': ['Hard', 'Amazon', 'Google', 'Microsoft', 'Facebook'],
  'Candy: distribute sweets': ['Hard', 'Amazon', 'Google'],
  'Implement the KMP algorithm': ['Hard', 'Amazon', 'Google'],
  'Alien dictionary': ['Hard', 'Amazon', 'Facebook', 'Google', 'Airbnb'],
  'Cheapest flights within k stops': ['Hard', 'Amazon', 'Google'],
  'Redundant connection': ['Hard', 'Amazon', 'Google'],
  'Accounts merge': ['Hard', 'Amazon', 'Facebook', 'Google'],
  "Minimum spanning tree": ['Hard', 'Amazon', 'Google'],
  'Find the critical connections': ['Hard', 'Amazon', 'Google'],
};

const dry = process.argv.includes('--dry');
const report = process.argv.includes('--report');

const rows = load(SOURCE);

if (report) {
  const tagged = rows.filter(r => r.companies);
  console.log(`tagged questions: ${tagged.length}\n`);

  for (const level of ['Easy', 'Medium', 'Hard']) {
    const inLevel = tagged.filter(r => r.difficulty === level);
    console.log(`${level.toUpperCase()} (${inLevel.length})`);
  }

  const byCompany = new Map();
  for (const r of tagged)
    for (const c of r.companies) byCompany.set(c, (byCompany.get(c) || 0) + 1);

  console.log('\ncommonly reported at:');
  for (const [company, n] of [...byCompany].sort((a, b) => b[1] - a[1]))
    console.log(`  ${company.padEnd(16)} ${n}`);

  process.exit(0);
}

let applied = 0, difficultyChanged = 0;
const unmatched = [];

for (const [fragment, [difficulty, ...companies]] of Object.entries(TAGS)) {
  const key = normalize(fragment);
  const row = rows.find(r => normalize(r.question).startsWith(key));

  if (!row) { unmatched.push(fragment); continue; }

  if (row.difficulty !== difficulty) difficultyChanged++;
  row.difficulty = difficulty;
  row.companies = companies;
  applied++;
}

console.log(`tagged ${applied} questions, ${difficultyChanged} difficulty corrections`);
if (unmatched.length) {
  console.log(`\n${unmatched.length} fragment(s) matched no question:`);
  unmatched.forEach(f => console.log('  ' + f));
}

const tagged = rows.filter(r => r.companies);
console.log('\ndifficulty spread of tagged questions:');
for (const [level, n] of countBy(tagged, 'difficulty')) console.log(`  ${level}: ${n}`);

if (dry) console.log('\n--dry: not written');
else { writeSource(rows); console.log('\nwrote data/*.json'); }
