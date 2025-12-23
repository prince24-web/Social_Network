-- Add Hidden Test Cases Migration
-- Updates all challenges to include hidden test cases that prevent hardcoding bypasses
-- Each challenge gets 1-2 visible test cases and 3 hidden test cases

-- JavaScript Easy Challenges

UPDATE challenges SET test_cases = '[
  {"input": [[2,7,11,15], 9], "output": [0,1], "hidden": false},
  {"input": [[3,2,4], 6], "output": [1,2], "hidden": false},
  {"input": [[1,5,3,7], 8], "output": [1,2], "hidden": true},
  {"input": [[0,4,3,0], 0], "output": [0,3], "hidden": true},
  {"input": [[-1,-2,-3,-4,-5], -8], "output": [2,4], "hidden": true}
]'::jsonb WHERE id = 'two-sum-js';

UPDATE challenges SET test_cases = '[
  {"input": ["hello"], "output": "olleh", "hidden": false},
  {"input": ["abc"], "output": "cba", "hidden": false},
  {"input": ["JavaScript"], "output": "tpircSavaJ", "hidden": true},
  {"input": ["12345"], "output": "54321", "hidden": true},
  {"input": ["A"], "output": "A", "hidden": true}
]'::jsonb WHERE id = 'reverse-string-js';

UPDATE challenges SET test_cases = '[
  {"input": [[1,5,3]], "output": 5, "hidden": false},
  {"input": [[-1,-5,-3]], "output": -1, "hidden": false},
  {"input": [[100,200,50,300]], "output": 300, "hidden": true},
  {"input": [[0]], "output": 0, "hidden": true},
  {"input": [[-10,0,10]], "output": 10, "hidden": true}
]'::jsonb WHERE id = 'max-number-js';

UPDATE challenges SET test_cases = '[
  {"input": ["racecar"], "output": true, "hidden": false},
  {"input": ["hello"], "output": false, "hidden": false},
  {"input": ["level"], "output": true, "hidden": true},
  {"input": ["noon"], "output": true, "hidden": true},
  {"input": ["palindrome"], "output": false, "hidden": true}
]'::jsonb WHERE id = 'palindrome-js';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3]], "output": 6, "hidden": false},
  {"input": [[5]], "output": 5, "hidden": false},
  {"input": [[10,20,30,40]], "output": 100, "hidden": true},
  {"input": [[-1,-2,-3]], "output": -6, "hidden": true},
  {"input": [[0,0,0]], "output": 0, "hidden": true}
]'::jsonb WHERE id = 'sum-array-js';

UPDATE challenges SET test_cases = '[
  {"input": ["hello"], "output": 2, "hidden": false},
  {"input": ["xyz"], "output": 0, "hidden": false},
  {"input": ["aeiou"], "output": 5, "hidden": true},
  {"input": ["AEIOU"], "output": 5, "hidden": true},
  {"input": ["rhythm"], "output": 0, "hidden": true}
]'::jsonb WHERE id = 'count-vowels-js';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3,4]], "output": [2,4], "hidden": false},
  {"input": [[1,3,5,7]], "output": [], "hidden": true},
  {"input": [[2,4,6,8]], "output": [2,4,6,8], "hidden": true},
  {"input": [[0,1,2]], "output": [0,2], "hidden": true}
]'::jsonb WHERE id = 'even-numbers-js';

UPDATE challenges SET test_cases = '[
  {"input": ["hello"], "output": "Hello", "hidden": false},
  {"input": ["world"], "output": "World", "hidden": true},
  {"input": ["javascript"], "output": "Javascript", "hidden": true},
  {"input": ["a"], "output": "A", "hidden": true}
]'::jsonb WHERE id = 'capitalize-js';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3]], "output": 3, "hidden": false},
  {"input": [[]], "output": 0, "hidden": true},
  {"input": [[1,2,3,4,5,6,7,8,9,10]], "output": 10, "hidden": true},
  {"input": [["a"]], "output": 1, "hidden": true}
]'::jsonb WHERE id = 'array-length-js';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3]], "output": [1,4,9], "hidden": false},
  {"input": [[0,5,10]], "output": [0,25,100], "hidden": true},
  {"input": [[-1,-2,-3]], "output": [1,4,9], "hidden": true},
  {"input": [[4]], "output": [16], "hidden": true}
]'::jsonb WHERE id = 'square-numbers-js';

-- JavaScript Medium Challenges

UPDATE challenges SET test_cases = '[
  {"input": ["()[]{}"], "output": true, "hidden": false},
  {"input": ["(]"], "output": false, "hidden": false},
  {"input": ["([])"], "output": true, "hidden": true},
  {"input": ["{[}]"], "output": false, "hidden": true},
  {"input": ["(((())))"], "output": true, "hidden": true}
]'::jsonb WHERE id = 'valid-parentheses-js';

UPDATE challenges SET test_cases = '[
  {"input": ["I love JavaScript"], "output": "JavaScript", "hidden": false},
  {"input": ["Hello World"], "output": "Hello", "hidden": true},
  {"input": ["The quick brown fox"], "output": "quick", "hidden": true},
  {"input": ["a"], "output": "a", "hidden": true}
]'::jsonb WHERE id = 'longest-word-js';

UPDATE challenges SET test_cases = '[
  {"input": [[1,1,2,3]], "output": [1,2,3], "hidden": false},
  {"input": [[1,2,3]], "output": [1,2,3], "hidden": true},
  {"input": [[5,5,5,5]], "output": [5], "hidden": true},
  {"input": [[1,2,2,3,3,3]], "output": [1,2,3], "hidden": true}
]'::jsonb WHERE id = 'remove-duplicates-js';

UPDATE challenges SET test_cases = '[
  {"input": [5], "output": 5, "hidden": false},
  {"input": [0], "output": 0, "hidden": true},
  {"input": [1], "output": 1, "hidden": true},
  {"input": [10], "output": 55, "hidden": true},
  {"input": [7], "output": 13, "hidden": true}
]'::jsonb WHERE id = 'fibonacci-js';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3,4], 2], "output": [[1,2],[3,4]], "hidden": false},
  {"input": [[1,2,3,4,5], 2], "output": [[1,2],[3,4],[5]], "hidden": true},
  {"input": [[1,2,3], 1], "output": [[1],[2],[3]], "hidden": true},
  {"input": [[1,2,3,4,5,6], 3], "output": [[1,2,3],[4,5,6]], "hidden": true}
]'::jsonb WHERE id = 'array-chunk-js';

UPDATE challenges SET test_cases = '[
  {"input": ["anagram", "nagaram"], "output": true, "hidden": false},
  {"input": ["rat", "car"], "output": false, "hidden": true},
  {"input": ["listen", "silent"], "output": true, "hidden": true},
  {"input": ["hello", "world"], "output": false, "hidden": true}
]'::jsonb WHERE id = 'anagram-js';

UPDATE challenges SET test_cases = '[
  {"input": [[-2,1,-3,4,-1,2,1,-5,4]], "output": 6, "hidden": false},
  {"input": [[1]], "output": 1, "hidden": true},
  {"input": [[5,4,-1,7,8]], "output": 23, "hidden": true},
  {"input": [[-1,-2,-3]], "output": -1, "hidden": true}
]'::jsonb WHERE id = 'max-subarray-js';

UPDATE challenges SET test_cases = '[
  {"input": [[1,[2,[3]]]], "output": [1,2,3], "hidden": false},
  {"input": [[1,2,3]], "output": [1,2,3], "hidden": true},
  {"input": [[1,[2],[[3]],[[[4]]]]], "output": [1,2,3,4], "hidden": true},
  {"input": [[]], "output": [], "hidden": true}
]'::jsonb WHERE id = 'flatten-array-js';

UPDATE challenges SET test_cases = '[
  {"input": ["aaabb"], "output": "a3b2", "hidden": false},
  {"input": ["aabbcc"], "output": "a2b2c2", "hidden": true},
  {"input": ["abc"], "output": "a1b1c1", "hidden": true},
  {"input": ["aaaa"], "output": "a4", "hidden": true}
]'::jsonb WHERE id = 'string-compress-js';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3,4], 1], "output": [4,1,2,3], "hidden": false},
  {"input": [[1,2,3,4], 2], "output": [3,4,1,2], "hidden": true},
  {"input": [[1,2,3], 3], "output": [1,2,3], "hidden": true},
  {"input": [[1], 5], "output": [1], "hidden": true}
]'::jsonb WHERE id = 'rotate-array-js';

-- JavaScript Hard Challenges

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3,4,5], 4], "output": 3, "hidden": false},
  {"input": [[1,2,3,4,5], 1], "output": 0, "hidden": true},
  {"input": [[1,2,3,4,5], 6], "output": -1, "hidden": true},
  {"input": [[1,3,5,7,9,11], 7], "output": 3, "hidden": true}
]'::jsonb WHERE id = 'binary-search-js';

UPDATE challenges SET test_cases = '[
  {"input": [[[1,3],[2,6],[8,10]]], "output": [[1,6],[8,10]], "hidden": false},
  {"input": [[[1,4],[4,5]]], "output": [[1,5]], "hidden": true},
  {"input": [[[1,2],[3,4]]], "output": [[1,2],[3,4]], "hidden": true},
  {"input": [[[1,10],[2,3],[4,5]]], "output": [[1,10]], "hidden": true}
]'::jsonb WHERE id = 'merge-intervals-js';

UPDATE challenges SET test_cases = '[
  {"input": ["abcabcbb"], "output": 3, "hidden": false},
  {"input": ["bbbbb"], "output": 1, "hidden": true},
  {"input": ["pwwkew"], "output": 3, "hidden": true},
  {"input": ["abcdef"], "output": 6, "hidden": true}
]'::jsonb WHERE id = 'longest-substring-js';

UPDATE challenges SET test_cases = '[
  {"input": [{"a":{"b":1}}], "output": {"a":{"b":1}}, "hidden": false},
  {"input": [{"x":1,"y":2}], "output": {"x":1,"y":2}, "hidden": true},
  {"input": [[1,2,3]], "output": [1,2,3], "hidden": true},
  {"input": [{"a":[1,2,{"b":3}]}], "output": {"a":[1,2,{"b":3}]}, "hidden": true}
]'::jsonb WHERE id = 'deep-clone-js';

-- Python Easy Challenges

UPDATE challenges SET test_cases = '[
  {"input": [[2,7,11,15], 9], "output": [0,1], "hidden": false},
  {"input": [[3,2,4], 6], "output": [1,2], "hidden": false},
  {"input": [[1,5,3,7], 8], "output": [1,2], "hidden": true},
  {"input": [[0,4,3,0], 0], "output": [0,3], "hidden": true},
  {"input": [[-1,-2,-3,-4,-5], -8], "output": [2,4], "hidden": true}
]'::jsonb WHERE id = 'two-sum-py';

UPDATE challenges SET test_cases = '[
  {"input": ["hello"], "output": "olleh", "hidden": false},
  {"input": ["Python"], "output": "nohtyP", "hidden": true},
  {"input": ["12345"], "output": "54321", "hidden": true},
  {"input": ["a"], "output": "a", "hidden": true}
]'::jsonb WHERE id = 'reverse-string-py';

UPDATE challenges SET test_cases = '[
  {"input": [[1,5,3]], "output": 5, "hidden": false},
  {"input": [[100,200,50,300]], "output": 300, "hidden": true},
  {"input": [[0]], "output": 0, "hidden": true},
  {"input": [[-10,0,10]], "output": 10, "hidden": true}
]'::jsonb WHERE id = 'find-max-py';

UPDATE challenges SET test_cases = '[
  {"input": ["racecar"], "output": true, "hidden": false},
  {"input": ["hello"], "output": false, "hidden": false},
  {"input": ["level"], "output": true, "hidden": true},
  {"input": ["noon"], "output": true, "hidden": true},
  {"input": ["palindrome"], "output": false, "hidden": true}
]'::jsonb WHERE id = 'palindrome-py';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3]], "output": 6, "hidden": false},
  {"input": [[10,20,30,40]], "output": 100, "hidden": true},
  {"input": [[-1,-2,-3]], "output": -6, "hidden": true},
  {"input": [[0,0,0]], "output": 0, "hidden": true}
]'::jsonb WHERE id = 'sum-array-py';

UPDATE challenges SET test_cases = '[
  {"input": ["hello"], "output": 2, "hidden": false},
  {"input": ["aeiou"], "output": 5, "hidden": true},
  {"input": ["AEIOU"], "output": 5, "hidden": true},
  {"input": ["rhythm"], "output": 0, "hidden": true}
]'::jsonb WHERE id = 'count-vowels-py';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3,4]], "output": [2,4], "hidden": false},
  {"input": [[1,3,5,7]], "output": [], "hidden": true},
  {"input": [[2,4,6,8]], "output": [2,4,6,8], "hidden": true},
  {"input": [[0,1,2]], "output": [0,2], "hidden": true}
]'::jsonb WHERE id = 'filter-evens-py';

UPDATE challenges SET test_cases = '[
  {"input": ["hello"], "output": "Hello", "hidden": false},
  {"input": ["world"], "output": "World", "hidden": true},
  {"input": ["python"], "output": "Python", "hidden": true},
  {"input": ["a"], "output": "A", "hidden": true}
]'::jsonb WHERE id = 'capitalize-py';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3]], "output": 3, "hidden": false},
  {"input": [[]], "output": 0, "hidden": true},
  {"input": [[1,2,3,4,5,6,7,8,9,10]], "output": 10, "hidden": true},
  {"input": [["a"]], "output": 1, "hidden": true}
]'::jsonb WHERE id = 'array-length-py';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3]], "output": [1,4,9], "hidden": false},
  {"input": [[0,5,10]], "output": [0,25,100], "hidden": true},
  {"input": [[-1,-2,-3]], "output": [1,4,9], "hidden": true},
  {"input": [[4]], "output": [16], "hidden": true}
]'::jsonb WHERE id = 'square-numbers-py';

-- Python Medium Challenges

UPDATE challenges SET test_cases = '[
  {"input": ["()[]{}"], "output": true, "hidden": false},
  {"input": ["(]"], "output": false, "hidden": false},
  {"input": ["([])"], "output": true, "hidden": true},
  {"input": ["{[}]"], "output": false, "hidden": true},
  {"input": ["(((())))"], "output": true, "hidden": true}
]'::jsonb WHERE id = 'valid-parentheses-py';

UPDATE challenges SET test_cases = '[
  {"input": [[1,1,2,3]], "output": [1,2,3], "hidden": false},
  {"input": [[1,2,3]], "output": [1,2,3], "hidden": true},
  {"input": [[5,5,5,5]], "output": [5], "hidden": true},
  {"input": [[1,2,2,3,3,3]], "output": [1,2,3], "hidden": true}
]'::jsonb WHERE id = 'remove-duplicates-py';

UPDATE challenges SET test_cases = '[
  {"input": [5], "output": 5, "hidden": false},
  {"input": [0], "output": 0, "hidden": true},
  {"input": [1], "output": 1, "hidden": true},
  {"input": [10], "output": 55, "hidden": true},
  {"input": [7], "output": 13, "hidden": true}
]'::jsonb WHERE id = 'fibonacci-py';

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3,4], 2], "output": [[1,2],[3,4]], "hidden": false},
  {"input": [[1,2,3,4,5], 2], "output": [[1,2],[3,4],[5]], "hidden": true},
  {"input": [[1,2,3], 1], "output": [[1],[2],[3]], "hidden": true},
  {"input": [[1,2,3,4,5,6], 3], "output": [[1,2,3],[4,5,6]], "hidden": true}
]'::jsonb WHERE id = 'chunk-array-py';

UPDATE challenges SET test_cases = '[
  {"input": ["anagram", "nagaram"], "output": true, "hidden": false},
  {"input": ["rat", "car"], "output": false, "hidden": true},
  {"input": ["listen", "silent"], "output": true, "hidden": true},
  {"input": ["hello", "world"], "output": false, "hidden": true}
]'::jsonb WHERE id = 'anagram-py';

-- Python Hard Challenges

UPDATE challenges SET test_cases = '[
  {"input": [[1,2,3,4,5], 4], "output": 3, "hidden": false},
  {"input": [[1,2,3,4,5], 1], "output": 0, "hidden": true},
  {"input": [[1,2,3,4,5], 6], "output": -1, "hidden": true},
  {"input": [[1,3,5,7,9,11], 7], "output": 3, "hidden": true}
]'::jsonb WHERE id = 'binary-search-py';

UPDATE challenges SET test_cases = '[
  {"input": [[[1,3],[2,6],[8,10]]], "output": [[1,6],[8,10]], "hidden": false},
  {"input": [[[1,4],[4,5]]], "output": [[1,5]], "hidden": true},
  {"input": [[[1,2],[3,4]]], "output": [[1,2],[3,4]], "hidden": true},
  {"input": [[[1,10],[2,3],[4,5]]], "output": [[1,10]], "hidden": true}
]'::jsonb WHERE id = 'merge-intervals-py';
