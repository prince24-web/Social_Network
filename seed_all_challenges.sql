-- Seed All Challenges
-- This file is auto-generated
TRUNCATE TABLE challenges;

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'two-sum-js',
    'Two Sum',
    'Return indices of two numbers that add up to target.',
    'javascript',
    'easy',
    'function twoSum(nums, target) {}',
    'function twoSum(nums, target) {
  
}',
    '[{"input":[[2,7,11,15],9],"output":[0,1]},{"input":[[3,2,4],6],"output":[1,2]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'reverse-string-js',
    'Reverse String',
    'Return the reversed version of the input string.',
    'javascript',
    'easy',
    'function reverseString(str) {}',
    'function reverseString(str) {
  
}',
    '[{"input":["hello"],"output":"olleh"},{"input":["abc"],"output":"cba"}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'max-number-js',
    'Find Maximum',
    'Return the largest number in an array.',
    'javascript',
    'easy',
    'function findMax(nums) {}',
    'function findMax(nums) {
  
}',
    '[{"input":[[1,5,3]],"output":5},{"input":[[-1,-5,-3]],"output":-1}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'palindrome-js',
    'Palindrome Check',
    'Check if a string is a palindrome.',
    'javascript',
    'easy',
    'function isPalindrome(str) {}',
    'function isPalindrome(str) {
  
}',
    '[{"input":["racecar"],"output":true},{"input":["hello"],"output":false}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'sum-array-js',
    'Sum of Array',
    'Return the sum of all numbers in an array.',
    'javascript',
    'easy',
    'function sumArray(nums) {}',
    'function sumArray(nums) {
  
}',
    '[{"input":[[1,2,3]],"output":6},{"input":[[5]],"output":5}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'count-vowels-js',
    'Count Vowels',
    'Count the number of vowels in a string.',
    'javascript',
    'easy',
    'function countVowels(str) {}',
    'function countVowels(str) {
  
}',
    '[{"input":["hello"],"output":2},{"input":["xyz"],"output":0}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'even-numbers-js',
    'Filter Even Numbers',
    'Return only even numbers from an array.',
    'javascript',
    'easy',
    'function filterEvens(nums) {}',
    'function filterEvens(nums) {
  
}',
    '[{"input":[[1,2,3,4]],"output":[2,4]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'capitalize-js',
    'Capitalize First Letter',
    'Capitalize the first letter of a string.',
    'javascript',
    'easy',
    'function capitalize(str) {}',
    'function capitalize(str) {
  
}',
    '[{"input":["hello"],"output":"Hello"}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'array-length-js',
    'Array Length',
    'Return the length of an array.',
    'javascript',
    'easy',
    'function arrayLength(arr) {}',
    'function arrayLength(arr) {
  
}',
    '[{"input":[[1,2,3]],"output":3}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'square-numbers-js',
    'Square Numbers',
    'Return an array of squared numbers.',
    'javascript',
    'easy',
    'function squareNumbers(nums) {}',
    'function squareNumbers(nums) {
  
}',
    '[{"input":[[1,2,3]],"output":[1,4,9]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'valid-parentheses-js',
    'Valid Parentheses',
    'Check if parentheses are valid.',
    'javascript',
    'medium',
    'function isValid(s) {}',
    'function isValid(s) {
  
}',
    '[{"input":["()[]{}"],"output":true},{"input":["(]"],"output":false}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'longest-word-js',
    'Longest Word',
    'Return the longest word in a sentence.',
    'javascript',
    'medium',
    'function longestWord(sentence) {}',
    'function longestWord(sentence) {
  
}',
    '[{"input":["I love JavaScript"],"output":"JavaScript"}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'remove-duplicates-js',
    'Remove Duplicates',
    'Remove duplicates from an array.',
    'javascript',
    'medium',
    'function removeDuplicates(nums) {}',
    'function removeDuplicates(nums) {
  
}',
    '[{"input":[[1,1,2,3]],"output":[1,2,3]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'fibonacci-js',
    'Fibonacci Number',
    'Return the nth Fibonacci number.',
    'javascript',
    'medium',
    'function fibonacci(n) {}',
    'function fibonacci(n) {
  
}',
    '[{"input":[5],"output":5}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'array-chunk-js',
    'Array Chunk',
    'Split array into chunks of given size.',
    'javascript',
    'medium',
    'function chunkArray(arr, size) {}',
    'function chunkArray(arr, size) {
  
}',
    '[{"input":[[1,2,3,4],2],"output":[[1,2],[3,4]]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'anagram-js',
    'Valid Anagram',
    'Check if two strings are anagrams.',
    'javascript',
    'medium',
    'function isAnagram(s, t) {}',
    'function isAnagram(s, t) {
  
}',
    '[{"input":["anagram","nagaram"],"output":true}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'max-subarray-js',
    'Maximum Subarray Sum',
    'Find the maximum sum of a subarray.',
    'javascript',
    'medium',
    'function maxSubArray(nums) {}',
    'function maxSubArray(nums) {
  
}',
    '[{"input":[[-2,1,-3,4,-1,2,1,-5,4]],"output":6}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'flatten-array-js',
    'Flatten Array',
    'Flatten a nested array.',
    'javascript',
    'medium',
    'function flatten(arr) {}',
    'function flatten(arr) {
  
}',
    '[{"input":[[1,[2,[3]]]],"output":[1,2,3]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'string-compress-js',
    'String Compression',
    'Compress repeated characters.',
    'javascript',
    'medium',
    'function compress(str) {}',
    'function compress(str) {
  
}',
    '[{"input":["aaabb"],"output":"a3b2"}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'rotate-array-js',
    'Rotate Array',
    'Rotate array k times to the right.',
    'javascript',
    'medium',
    'function rotate(nums, k) {}',
    'function rotate(nums, k) {
  
}',
    '[{"input":[[1,2,3,4],1],"output":[4,1,2,3]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'binary-search-js',
    'Binary Search',
    'Search target in sorted array.',
    'javascript',
    'hard',
    'function binarySearch(nums, target) {}',
    'function binarySearch(nums, target) {
  
}',
    '[{"input":[[1,2,3,4,5],4],"output":3}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'merge-intervals-js',
    'Merge Intervals',
    'Merge overlapping intervals.',
    'javascript',
    'hard',
    'function merge(intervals) {}',
    'function merge(intervals) {
  
}',
    '[{"input":[[[1,3],[2,6],[8,10]]],"output":[[1,6],[8,10]]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'longest-substring-js',
    'Longest Substring Without Repeating Characters',
    'Find length of longest substring.',
    'javascript',
    'hard',
    'function longestSubstring(s) {}',
    'function longestSubstring(s) {
  
}',
    '[{"input":["abcabcbb"],"output":3}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'deep-clone-js',
    'Deep Clone Object',
    'Deep clone a nested object.',
    'javascript',
    'hard',
    'function deepClone(obj) {}',
    'function deepClone(obj) {
  
}',
    '[{"input":[{"a":{"b":1}}],"output":{"a":{"b":1}}}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'debounce-js',
    'Debounce Function',
    'Implement debounce utility.',
    'javascript',
    'hard',
    'function debounce(fn, delay) {}',
    'function debounce(fn, delay) {
  
}',
    '[]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'throttle-js',
    'Throttle Function',
    'Implement throttle utility.',
    'javascript',
    'hard',
    'function throttle(fn, limit) {}',
    'function throttle(fn, limit) {
  
}',
    '[]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'promise-all-js',
    'Promise.all Polyfill',
    'Implement Promise.all.',
    'javascript',
    'hard',
    'function promiseAll(promises) {}',
    'function promiseAll(promises) {
  
}',
    '[]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'lru-cache-js',
    'LRU Cache',
    'Design an LRU Cache.',
    'javascript',
    'hard',
    'class LRUCache {}',
    'class LRUCache {
  constructor(capacity) {}
}',
    '[]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'json-parser-js',
    'JSON Parser',
    'Parse a JSON string.',
    'javascript',
    'hard',
    'function parseJSON(str) {}',
    'function parseJSON(str) {
  
}',
    '[]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'graph-path-js',
    'Shortest Path in Graph',
    'Find shortest path in graph.',
    'javascript',
    'hard',
    'function shortestPath(graph, start, end) {}',
    'function shortestPath(graph, start, end) {
  
}',
    '[]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'two-sum-py',
    'Two Sum',
    'Return indices of two numbers that add up to target.',
    'python',
    'easy',
    'def two_sum(nums, target):',
    'def two_sum(nums, target):
    pass',
    '[{"input":[[2,7,11,15],9],"output":[0,1]},{"input":[[3,2,4],6],"output":[1,2]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'reverse-string-py',
    'Reverse String',
    'Return the reversed version of the input string.',
    'python',
    'easy',
    'def reverse_string(s):',
    'def reverse_string(s):
    pass',
    '[{"input":["hello"],"output":"olleh"}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'find-max-py',
    'Find Maximum',
    'Return the largest number in an array.',
    'python',
    'easy',
    'def find_max(nums):',
    'def find_max(nums):
    pass',
    '[{"input":[[1,5,3]],"output":5}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'palindrome-py',
    'Palindrome Check',
    'Check if a string is a palindrome.',
    'python',
    'easy',
    'def is_palindrome(s):',
    'def is_palindrome(s):
    pass',
    '[{"input":["racecar"],"output":true},{"input":["hello"],"output":false}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'sum-array-py',
    'Sum of Array',
    'Return the sum of all numbers in an array.',
    'python',
    'easy',
    'def sum_array(nums):',
    'def sum_array(nums):
    pass',
    '[{"input":[[1,2,3]],"output":6}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'count-vowels-py',
    'Count Vowels',
    'Count the number of vowels in a string.',
    'python',
    'easy',
    'def count_vowels(s):',
    'def count_vowels(s):
    pass',
    '[{"input":["hello"],"output":2}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'filter-evens-py',
    'Filter Even Numbers',
    'Return only even numbers from an array.',
    'python',
    'easy',
    'def filter_evens(nums):',
    'def filter_evens(nums):
    pass',
    '[{"input":[[1,2,3,4]],"output":[2,4]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'capitalize-py',
    'Capitalize First Letter',
    'Capitalize the first letter of a string.',
    'python',
    'easy',
    'def capitalize(s):',
    'def capitalize(s):
    pass',
    '[{"input":["hello"],"output":"Hello"}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'array-length-py',
    'Array Length',
    'Return the length of an array.',
    'python',
    'easy',
    'def array_length(arr):',
    'def array_length(arr):
    pass',
    '[{"input":[[1,2,3]],"output":3}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'square-numbers-py',
    'Square Numbers',
    'Return an array of squared numbers.',
    'python',
    'easy',
    'def square_numbers(nums):',
    'def square_numbers(nums):
    pass',
    '[{"input":[[1,2,3]],"output":[1,4,9]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'valid-parentheses-py',
    'Valid Parentheses',
    'Check if parentheses are valid.',
    'python',
    'medium',
    'def is_valid(s):',
    'def is_valid(s):
    pass',
    '[{"input":["()[]{}"],"output":true},{"input":["(]"],"output":false}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'remove-duplicates-py',
    'Remove Duplicates',
    'Remove duplicates from an array.',
    'python',
    'medium',
    'def remove_duplicates(nums):',
    'def remove_duplicates(nums):
    pass',
    '[{"input":[[1,1,2,3]],"output":[1,2,3]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'fibonacci-py',
    'Fibonacci Number',
    'Return the nth Fibonacci number.',
    'python',
    'medium',
    'def fibonacci(n):',
    'def fibonacci(n):
    pass',
    '[{"input":[5],"output":5}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'chunk-array-py',
    'Array Chunk',
    'Split array into chunks of given size.',
    'python',
    'medium',
    'def chunk_array(arr, size):',
    'def chunk_array(arr, size):
    pass',
    '[{"input":[[1,2,3,4],2],"output":[[1,2],[3,4]]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'anagram-py',
    'Valid Anagram',
    'Check if two strings are anagrams.',
    'python',
    'medium',
    'def is_anagram(s, t):',
    'def is_anagram(s, t):
    pass',
    '[{"input":["anagram","nagaram"],"output":true}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'binary-search-py',
    'Binary Search',
    'Search target in sorted array.',
    'python',
    'hard',
    'def binary_search(nums, target):',
    'def binary_search(nums, target):
    pass',
    '[{"input":[[1,2,3,4,5],4],"output":3}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'merge-intervals-py',
    'Merge Intervals',
    'Merge overlapping intervals.',
    'python',
    'hard',
    'def merge_intervals(intervals):',
    'def merge_intervals(intervals):
    pass',
    '[{"input":[[[1,3],[2,6],[8,10]]],"output":[[1,6],[8,10]]}]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    'lru-cache-py',
    'LRU Cache',
    'Design an LRU Cache.',
    'python',
    'hard',
    'class LRUCache:',
    'class LRUCache:
    def __init__(self, capacity):
        pass',
    '[]'::jsonb
);