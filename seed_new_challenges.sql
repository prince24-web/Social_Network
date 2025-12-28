-- Seed New Challenges (40 Total)
-- 10 JS Medium, 10 JS Hard, 10 Python Medium, 10 Python Hard

-- ==========================================
-- JavaScript Medium Challenges
-- ==========================================

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'group-anagrams-js',
    'Group Anagrams',
    'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```
',
    'javascript',
    'medium',
    'function groupAnagrams(strs) {}',
    'function groupAnagrams(strs) {
  
}',
    '[
        {"input": [["eat","tea","tan","ate","nat","bat"]], "output": [["bat"],["nat","tan"],["ate","eat","tea"]], "hidden": false},
        {"input": [[""]], "output": [[""]], "hidden": false},
        {"input": [["a"]], "output": [["a"]], "hidden": true},
        {"input": [["abc", "bca", "cab", "xyz", "zyx", "yxz"]], "output": [["abc","bca","cab"],["xyz","zyx","yxz"]], "hidden": true},
        {"input": [["listen", "silent", "enlist", "google", "gogole"]], "output": [["listen","silent","enlist"],["google","gogole"]], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'top-k-frequent-js',
    'Top K Frequent Elements',
    'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

**Example 1:**
```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```
',
    'javascript',
    'medium',
    'function topKFrequent(nums, k) {}',
    'function topKFrequent(nums, k) {
  
}',
    '[
        {"input": [[1,1,1,2,2,3], 2], "output": [1,2], "hidden": false},
        {"input": [[1], 1], "output": [1], "hidden": false},
        {"input": [[1,1,1,2,2,2,3,3,3], 3], "output": [1,2,3], "hidden": true},
        {"input": [[4,4,4,4,1,1,1,2,2,3], 2], "output": [4,1], "hidden": true},
        {"input": [[-1,-1], 1], "output": [-1], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'search-rotated-array-js',
    'Search in Rotated Sorted Array',
    'There is an integer array `nums` sorted in ascending order (with distinct values).
Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k`.
Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.

**Example 1:**
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```
',
    'javascript',
    'medium',
    'function search(nums, target) {}',
    'function search(nums, target) {
  
}',
    '[
        {"input": [[4,5,6,7,0,1,2], 0], "output": 4, "hidden": false},
        {"input": [[4,5,6,7,0,1,2], 3], "output": -1, "hidden": false},
        {"input": [[1], 0], "output": -1, "hidden": true},
        {"input": [[1,3], 3], "output": 1, "hidden": true},
        {"input": [[5,1,3], 5], "output": 0, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'permutations-js',
    'Permutations',
    'Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.

**Example 1:**
```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```
',
    'javascript',
    'medium',
    'function permute(nums) {}',
    'function permute(nums) {
  
}',
    '[
        {"input": [[1,2,3]], "output": [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], "hidden": false},
        {"input": [[0,1]], "output": [[0,1],[1,0]], "hidden": false},
        {"input": [[1]], "output": [[1]], "hidden": true},
        {"input": [[1,2]], "output": [[1,2],[2,1]], "hidden": true},
        {"input": [[5,6]], "output": [[5,6],[6,5]], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'subset-sum-js',
    'Subset Sum',
    'Given an array of non-negative integers `nums` and a target integer `target`, return `true` if there is a subset of `nums` that adds up to `target`, and `false` otherwise.

**Example 1:**
```
Input: nums = [1, 5, 11, 5], target = 11
Output: true
```
',
    'javascript',
    'medium',
    'function canPartition(nums, target) {}',
    'function canPartition(nums, target) {
  
}',
    '[
        {"input": [[1, 5, 11, 5], 11], "output": true, "hidden": false},
        {"input": [[1, 2, 3, 5], 9], "output": true, "hidden": false},
        {"input": [[1, 2, 3, 4], 20], "output": false, "hidden": true},
        {"input": [[1, 1, 1, 1], 3], "output": true, "hidden": true},
        {"input": [[1, 2, 5], 4], "output": false, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'clone-graph-js',
    'Clone Graph',
    'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.
Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.

**Example 1:**
```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
```
',
    'javascript',
    'medium',
    'function cloneGraph(node) {}',
    'function cloneGraph(node) {
  
}',
    '[
         {"input": [[{ "val": 1, "neighbors": [2, 4] }, { "val": 2, "neighbors": [1, 3] }, { "val": 3, "neighbors": [2, 4] }, { "val": 4, "neighbors": [1, 3] }]], "output": [[2,4],[1,3],[2,4],[1,3]], "hidden": false},
         {"input": [[]], "output": [[]], "hidden": false},
         {"input": [], "output": [], "hidden": true},
         {"input": [[{"val": 1, "neighbors": []}]], "output": [[]], "hidden": true},
         {"input": [[{"val":1,"neighbors":[2]},{"val":2,"neighbors":[1]}]], "output": [[2],[1]], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'generate-parentheses-js',
    'Generate Parentheses',
    'Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Example 1:**
```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```
',
    'javascript',
    'medium',
    'function generateParenthesis(n) {}',
    'function generateParenthesis(n) {
  
}',
    '[
        {"input": [3], "output": ["((()))","(()())","(())()","()(())","()()()"], "hidden": false},
        {"input": [1], "output": ["()"], "hidden": false},
        {"input": [2], "output": ["(())","()()"], "hidden": true},
        {"input": [4], "output": ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"], "hidden": true},
        {"input": [0], "output": [""], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'word-search-js',
    'Word Search',
    'Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```
',
    'javascript',
    'medium',
    'function exist(board, word) {}',
    'function exist(board, word) {
  
}',
    '[
        {"input": [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"], "output": true, "hidden": false},
        {"input": [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"], "output": true, "hidden": false},
        {"input": [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"], "output": false, "hidden": true},
        {"input": [[["a"]], "a"], "output": true, "hidden": true},
        {"input": [[["a","b"],["c","d"]], "abcd"], "output": false, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'product-except-self-js',
    'Product of Array Except Self',
    'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```
',
    'javascript',
    'medium',
    'function productExceptSelf(nums) {}',
    'function productExceptSelf(nums) {
  
}',
    '[
        {"input": [[1,2,3,4]], "output": [24,12,8,6], "hidden": false},
        {"input": [[-1,1,0,-3,3]], "output": [0,0,9,0,0], "hidden": false},
        {"input": [[1,1]], "output": [1,1], "hidden": true},
        {"input": [[0,0]], "output": [0,0], "hidden": true},
        {"input": [[5,2,3]], "output": [6,15,10], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'increasing-triplet-js',
    'Increasing Triplet Subsequence',
    'Given an integer array `nums`, return `true` if there exists a triple of indices `(i, j, k)` such that `i < j < k` and `nums[i] < nums[j] < nums[k]`. If no such indices exists, return `false`.

**Example 1:**
```
Input: nums = [1,2,3,4,5]
Output: true
```
',
    'javascript',
    'medium',
    'function increasingTriplet(nums) {}',
    'function increasingTriplet(nums) {
  
}',
    '[
        {"input": [[1,2,3,4,5]], "output": true, "hidden": false},
        {"input": [[5,4,3,2,1]], "output": false, "hidden": false},
        {"input": [[2,1,5,0,4,6]], "output": true, "hidden": true},
        {"input": [[1,2,1,2,1,2]], "output": false, "hidden": true},
        {"input": [[20,100,10,12,5,13]], "output": true, "hidden": true}
    ]'::jsonb
);

-- ==========================================
-- JavaScript Hard Challenges
-- ==========================================

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'sudoku-solver-js',
    'Sudoku Solver',
    'Write a program to solve a Sudoku puzzle by filling the empty cells.
A sudoku solution must satisfy all of the following rules:
1. Each of the digits `1-9` must occur exactly once in each row.
2. Each of the digits `1-9` must occur exactly once in each column.
3. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.
The `.` character indicates empty cells.

**Example:**
```
Input: board = [["5","3",".",".","7",".",".",".","."],...]
Output: [["5","3","4","6","7","8","9","1","2"],...]
```
',
    'javascript',
    'hard',
    'function solveSudoku(board) {}',
    'function solveSudoku(board) {
  
}',
    '[
        {"input": [[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]], "output": [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]], "hidden": false},
        {"input": [[]], "output": [[]], "hidden": true}, 
        {"input": [[["1",".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".",".","."]]], "output": [], "hidden": true},
        {"input": [[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]], "output": [], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'n-queens-js',
    'N-Queens',
    'The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.
Given an integer `n`, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

**Example 1:**
```
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
```
',
    'javascript',
    'hard',
    'function solveNQueens(n) {}',
    'function solveNQueens(n) {
  
}',
    '[
        {"input": [4], "output": [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]], "hidden": false},
        {"input": [1], "output": [["Q"]], "hidden": false},
        {"input": [2], "output": [], "hidden": true},
        {"input": [3], "output": [], "hidden": true},
        {"input": [5], "output": [["Q....","..Q..","....Q",".Q...","...Q."],["Q....","...Q.",".Q...","....Q","..Q.."],[".Q...","...Q.","Q....","..Q..","....Q"],[".Q...","....Q","..Q..","Q....","...Q."],["..Q..","Q....","...Q.",".Q...","....Q"],["..Q..","....Q",".Q...","...Q.","Q...."],["...Q.","Q....","..Q..","....Q",".Q..."],["...Q.",".Q...","....Q","..Q..","Q...."],["....Q",".Q...","...Q.","Q....","..Q.."],["....Q","..Q..","Q....","...Q.",".Q..."]], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'trapping-rain-water-js',
    'Trapping Rain Water',
    'Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Example 1:**
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```
',
    'javascript',
    'hard',
    'function trap(height) {}',
    'function trap(height) {
  
}',
    '[
        {"input": [[0,1,0,2,1,0,1,3,2,1,2,1]], "output": 6, "hidden": false},
        {"input": [[4,2,0,3,2,5]], "output": 9, "hidden": false},
        {"input": [[0,0,0,0]], "output": 0, "hidden": true},
        {"input": [[5,4,3,2,1]], "output": 0, "hidden": true},
        {"input": [[1,0,5,0,0,0,5,0,1]], "output": 14, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'edit-distance-js',
    'Edit Distance',
    'Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.
You have the following three operations permitted on a word:
1. Insert a character
2. Delete a character
3. Replace a character

**Example 1:**
```
Input: word1 = "horse", word2 = "ros"
Output: 3
```
',
    'javascript',
    'hard',
    'function minDistance(word1, word2) {}',
    'function minDistance(word1, word2) {
  
}',
    '[
        {"input": ["horse", "ros"], "output": 3, "hidden": false},
        {"input": ["intention", "execution"], "output": 5, "hidden": false},
        {"input": ["", ""], "output": 0, "hidden": true},
        {"input": ["abc", "abc"], "output": 0, "hidden": true},
        {"input": ["abc", ""], "output": 3, "hidden": true}
    ]'::jsonb
);


-- ==========================================
-- Python Medium Challenges
-- ==========================================

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'longest-palindrome-py',
    'Longest Palindromic Substring',
    'Given a string `s`, return the longest palindromic substring in `s`.

**Example 1:**
```
Input: s = "babad"
Output: "bab"
```
',
    'python',
    'medium',
    'def longest_palindrome(s):',
    'def longest_palindrome(s):
    pass',
    '[
        {"input": ["babad"], "output": "bab", "hidden": false},
        {"input": ["cbbd"], "output": "bb", "hidden": false},
        {"input": ["a"], "output": "a", "hidden": true},
        {"input": ["ac"], "output": "a", "hidden": true},
        {"input": ["racecar"], "output": "racecar", "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'container-max-water-py',
    'Container With Most Water',
    'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.
Find two lines that together with the x-axis form a container, such that the container contains the most water.
Return the maximum amount of water a container can store.

**Example 1:**
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
```
',
    'python',
    'medium',
    'def max_area(height):',
    'def max_area(height):
    pass',
    '[
        {"input": [[1,8,6,2,5,4,8,3,7]], "output": 49, "hidden": false},
        {"input": [[1,1]], "output": 1, "hidden": false},
        {"input": [[4,3,2,1,4]], "output": 16, "hidden": true},
        {"input": [[1,2,1]], "output": 2, "hidden": true},
        {"input": [[0,0]], "output": 0, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    '3sum-py',
    '3Sum',
    'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.
Notice that the solution set must not contain duplicate triplets.

**Example 1:**
```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```
',
    'python',
    'medium',
    'def three_sum(nums):',
    'def three_sum(nums):
    pass',
    '[
        {"input": [[-1,0,1,2,-1,-4]], "output": [[-1,-1,2],[-1,0,1]], "hidden": false},
        {"input": [[0,1,1]], "output": [], "hidden": false},
        {"input": [[0,0,0]], "output": [[0,0,0]], "hidden": true},
        {"input": [[-2,0,1,1,2]], "output": [[-2,0,2],[-2,1,1]], "hidden": true},
        {"input": [[-1,0,1,0]], "output": [[-1,0,1]], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'letter-combinations-py',
    'Letter Combinations of a Phone Number',
    'Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

**Example 1:**
```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```
',
    'python',
    'medium',
    'def letter_combinations(digits):',
    'def letter_combinations(digits):
    pass',
    '[
        {"input": ["23"], "output": ["ad","ae","af","bd","be","bf","cd","ce","cf"], "hidden": false},
        {"input": [""], "output": [], "hidden": false},
        {"input": ["2"], "output": ["a","b","c"], "hidden": true},
        {"input": ["9"], "output": ["w","x","y","z"], "hidden": true},
        {"input": ["22"], "output": ["aa","ab","ac","ba","bb","bc","ca","cb","cc"], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'longest-common-subsequence-py',
    'Longest Common Subsequence',
    'Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return `0`.

**Example 1:**
```
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
```
',
    'python',
    'medium',
    'def longest_common_subsequence(text1, text2):',
    'def longest_common_subsequence(text1, text2):
    pass',
    '[
        {"input": ["abcde", "ace"], "output": 3, "hidden": false},
        {"input": ["abc", "abc"], "output": 3, "hidden": false},
        {"input": ["abc", "def"], "output": 0, "hidden": true},
        {"input": ["bl", "yby"], "output": 1, "hidden": true},
        {"input": ["oxcpqrsvwf", "shmtulqrypy"], "output": 2, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'kth-largest-py',
    'Kth Largest Element in an Array',
    'Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.

**Example 1:**
```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```
',
    'python',
    'medium',
    'def find_kth_largest(nums, k):',
    'def find_kth_largest(nums, k):
    pass',
    '[
        {"input": [[3,2,1,5,6,4], 2], "output": 5, "hidden": false},
        {"input": [[3,2,3,1,2,4,5,5,6], 4], "output": 4, "hidden": false},
        {"input": [[1], 1], "output": 1, "hidden": true},
        {"input": [[-1,-2,-3], 1], "output": -1, "hidden": true},
        {"input": [[99,99], 1], "output": 99, "hidden": true}
    ]'::jsonb
);

-- ==========================================
-- Python Hard Challenges
-- ==========================================

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'binary-tree-max-path-sum-py',
    'Binary Tree Maximum Path Sum',
    'A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.
The **path sum** of a path is the sum of the node''s values in the path.
Given the `root` of a binary tree, return the maximum **path sum** of any **non-empty** path.

**Example 1:**
```
Input: root = [1,2,3]
Output: 6
```
',
    'python',
    'hard',
    'def max_path_sum(root):',
    'def max_path_sum(root):
    pass',
    '[
        {"input": [{"val": 1, "left": {"val": 2}, "right": {"val": 3}}], "output": 6, "hidden": false},
        {"input": [{"val": -10, "left": {"val": 9}, "right": {"val": 20, "left": {"val": 15}, "right": {"val": 7}}}], "output": 42, "hidden": false},
        {"input": [{"val": -3}], "output": -3, "hidden": true},
        {"input": [{"val": 2, "left": {"val": -1}}], "output": 2, "hidden": true},
        {"input": [{"val": 1, "left": {"val": -2}, "right": {"val": 3}}], "output": 4, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'min-window-substring-py',
    'Minimum Window Substring',
    'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

**Example 1:**
```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
```
',
    'python',
    'hard',
    'def min_window(s, t):',
    'def min_window(s, t):
    pass',
    '[
        {"input": ["ADOBECODEBANC", "ABC"], "output": "BANC", "hidden": false},
        {"input": ["a", "a"], "output": "a", "hidden": false},
        {"input": ["a", "aa"], "output": "", "hidden": true},
        {"input": ["aa", "aa"], "output": "aa", "hidden": true},
        {"input": ["ab", "b"], "output": "b", "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'burst-balloons-py',
    'Burst Balloons',
    'You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons.
If you burst the `ith` balloon, you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array, then treat it as if there is a balloon with a `1` painted on it.
Return the maximum coins you can collect by bursting the balloons wisely.

**Example 1:**
```
Input: nums = [3,1,5,8]
Output: 167
```
',
    'python',
    'hard',
    'def max_coins(nums):',
    'def max_coins(nums):
    pass',
    '[
        {"input": [[3,1,5,8]], "output": 167, "hidden": false},
        {"input": [[1,5]], "output": 10, "hidden": false},
        {"input": [[9,7,8]], "output": 614, "hidden": true},
        {"input": [[1,2,3]], "output": 12, "hidden": true},
        {"input": [[2,4,8,4,2]], "output": 168, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'longest-valid-parentheses-py',
    'Longest Valid Parentheses',
    'Given a string containing just the characters `(` and `)`, return the length of the longest valid (well-formed) parentheses substring.

**Example 1:**
```
Input: s = "(()"
Output: 2
```
',
    'python',
    'hard',
    'def longest_valid_parentheses(s):',
    'def longest_valid_parentheses(s):
    pass',
    '[
        {"input": ["(()"], "output": 2, "hidden": false},
        {"input": [")()())"], "output": 4, "hidden": false},
        {"input": [""], "output": 0, "hidden": true},
        {"input": ["("], "output": 0, "hidden": true},
        {"input": ["()(())"], "output": 6, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'first-missing-positive-py',
    'First Missing Positive',
    'Given an unsorted integer array `nums`, return the smallest missing positive integer.
You must implement an algorithm that runs in `O(n)` time and uses `O(1)` auxiliary space.

**Example 1:**
```
Input: nums = [1,2,0]
Output: 3
```
',
    'python',
    'hard',
    'def first_missing_positive(nums):',
    'def first_missing_positive(nums):
    pass',
    '[
        {"input": [[1,2,0]], "output": 3, "hidden": false},
        {"input": [[3,4,-1,1]], "output": 2, "hidden": false},
        {"input": [[7,8,9,11,12]], "output": 1, "hidden": true},
        {"input": [[1]], "output": 2, "hidden": true},
        {"input": [[2,1]], "output": 3, "hidden": true}
    ]'::jsonb
);

-- ==========================================
-- JavaScript Hard Challenges (Continued)
-- ==========================================

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'regex-matching-js',
    'Regular Expression Matching',
    'Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*` where:
- `.` Matches any single character.
- `*` Matches zero or more of the preceding element.
The matching should cover the **entire** input string (not partial).

**Example 1:**
```
Input: s = "aa", p = "a"
Output: false
```
',
    'javascript',
    'hard',
    'function isMatch(s, p) {}',
    'function isMatch(s, p) {
  
}',
    '[
        {"input": ["aa", "a"], "output": false, "hidden": false},
        {"input": ["aa", "a*"], "output": true, "hidden": false},
        {"input": ["ab", ".*"], "output": true, "hidden": true},
        {"input": ["aab", "c*a*b"], "output": true, "hidden": true},
        {"input": ["mississippi", "mis*is*p*."], "output": false, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'median-two-arrays-js',
    'Median of Two Sorted Arrays',
    'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.
The overall run time complexity should be `O(log (m+n))`.

**Example 1:**
```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
```
',
    'javascript',
    'hard',
    'function findMedianSortedArrays(nums1, nums2) {}',
    'function findMedianSortedArrays(nums1, nums2) {
  
}',
    '[
        {"input": [[1,3], [2]], "output": 2, "hidden": false},
        {"input": [[1,2], [3,4]], "output": 2.5, "hidden": false},
        {"input": [[0,0], [0,0]], "output": 0, "hidden": true},
        {"input": [[], [1]], "output": 1, "hidden": true},
        {"input": [[2], []], "output": 2, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'serialize-deserialize-bt-js',
    'Serialize and Deserialize Binary Tree',
    'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer.
Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.

**Example 1:**
```
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
```
',
    'javascript',
    'hard',
    '/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    
};',
    'var serialize = function(root) {
  
};
var deserialize = function(data) {
  
};',
    '[
        {"input": [{"val":1,"left":{"val":2},"right":{"val":3,"left":{"val":4},"right":{"val":5}}}], "output": [{"val":1,"left":{"val":2},"right":{"val":3,"left":{"val":4},"right":{"val":5}}}], "hidden": false},
        {"input": [], "output": [], "hidden": false},
        {"input": [{"val":1}], "output": [{"val":1}], "hidden": true},
        {"input": [{"val":1,"left":{"val":2}}], "output": [{"val":1,"left":{"val":2}}], "hidden": true},
        {"input": [{"val":1,"right":{"val":2}}], "output": [{"val":1,"right":{"val":2}}], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'word-ladder-ii-js',
    'Word Ladder II',
    'A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:
- Every adjacent pair of words differs by a single letter.
- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.
- `sk == endWord`
Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return *all the shortest transformation sequences* from `beginWord` to `endWord`, or an empty list if no such sequence exists.

**Example 1:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
```
',
    'javascript',
    'hard',
    'function findLadders(beginWord, endWord, wordList) {}',
    'function findLadders(beginWord, endWord, wordList) {
  
}',
    '[
        {"input": ["hit", "cog", ["hot","dot","dog","lot","log","cog"]], "output": [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]], "hidden": false},
        {"input": ["hit", "cog", ["hot","dot","dog","lot","log"]], "output": [], "hidden": false},
        {"input": ["a", "c", ["a","b","c"]], "output": [["a","c"]], "hidden": true},
        {"input": ["red", "tax", ["ted","tex","red","tax","tad","den","rex","pee"]], "output": [["red","ted","tad","tax"],["red","ted","tex","tax"],["red","rex","tex","tax"]], "hidden": true},
        {"input": ["hot", "dog", ["hot","dog"]], "output": [], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'sliding-window-max-js',
    'Sliding Window Maximum',
    'You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.

**Example 1:**
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
```
',
    'javascript',
    'hard',
    'function maxSlidingWindow(nums, k) {}',
    'function maxSlidingWindow(nums, k) {
  
}',
    '[
        {"input": [[1,3,-1,-3,5,3,6,7], 3], "output": [3,3,5,5,6,7], "hidden": false},
        {"input": [[1], 1], "output": [1], "hidden": false},
        {"input": [[7,2,4], 2], "output": [7,4], "hidden": true},
        {"input": [[1,3,1,2,0,5], 3], "output": [3,3,2,5], "hidden": true},
        {"input": [[-7,-8,7,5,7,1,6,0], 4], "output": [7,7,7,7,7], "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'reverse-k-group-js',
    'Reverse Nodes in k-Group',
    'Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.
`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.
You may not alter the values in the list''s nodes, only nodes themselves may be changed.

**Example 1:**
```
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
```
',
    'javascript',
    'hard',
    'function reverseKGroup(head, k) {}',
    'function reverseKGroup(head, k) {
  
}',
    '[
        {"input": [{"val":1,"next":{"val":2,"next":{"val":3,"next":{"val":4,"next":{"val":5}}}}}, 2], "output": {"val":2,"next":{"val":1,"next":{"val":4,"next":{"val":3,"next":{"val":5}}}}}, "hidden": false},
        {"input": [{"val":1,"next":{"val":2,"next":{"val":3,"next":{"val":4,"next":{"val":5}}}}}, 3], "output": {"val":3,"next":{"val":2,"next":{"val":1,"next":{"val":4,"next":{"val":5}}}}}, "hidden": false},
        {"input": [{"val":1,"next":{"val":2}}, 2], "output": {"val":2,"next":{"val":1}}, "hidden": true},
        {"input": [{"val":1}, 1], "output": {"val":1}, "hidden": true},
        {"input": [{"val":1,"next":{"val":2}}, 3], "output": {"val":1,"next":{"val":2}}, "hidden": true}
    ]'::jsonb
);

-- ==========================================
-- Python Medium Challenges (Continued)
-- ==========================================

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'merge-k-lists-py',
    'Merge k Sorted Lists',
    'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

**Example 1:**
```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
```
',
    'python',
    'medium',
    'def merge_k_lists(lists):',
    'def merge_k_lists(lists):
    pass',
    '[
        {"input": [[{"val":1,"next":{"val":4,"next":{"val":5}}},{"val":1,"next":{"val":3,"next":{"val":4}}},{"val":2,"next":{"val":6}}]], "output": {"val":1,"next":{"val":1,"next":{"val":2,"next":{"val":3,"next":{"val":4,"next":{"val":4,"next":{"val":5,"next":{"val":6}}}}}}}}, "hidden": false},
        {"input": [], "output": null, "hidden": false},
        {"input": [[]], "output": null, "hidden": true},
        {"input": [[],[]], "output": null, "hidden": true},
        {"input": [[{"val":1}], [{"val":0}]], "output": {"val":0, "next": {"val":1}}, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'decode-ways-py',
    'Decode Ways',
    'A message containing letters from `A-Z` can be **encoded** into numbers using the following mapping:
`"A" -> "1", "B" -> "2", ... "Z" -> "26"`
To **decode** an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways).
Given a string `s` containing only digits, return the **number** of ways to **decode** it.

**Example 1:**
```
Input: s = "12"
Output: 2
```
',
    'python',
    'medium',
    'def num_decodings(s):',
    'def num_decodings(s):
    pass',
    '[
        {"input": ["12"], "output": 2, "hidden": false},
        {"input": ["226"], "output": 3, "hidden": false},
        {"input": ["06"], "output": 0, "hidden": true},
        {"input": ["11106"], "output": 2, "hidden": true},
        {"input": ["1"], "output": 1, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'unique-paths-py',
    'Unique Paths',
    'There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.
Given the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

**Example 1:**
```
Input: m = 3, n = 7
Output: 28
```
',
    'python',
    'medium',
    'def unique_paths(m, n):',
    'def unique_paths(m, n):
    pass',
    '[
        {"input": [3, 7], "output": 28, "hidden": false},
        {"input": [3, 2], "output": 3, "hidden": false},
        {"input": [1, 1], "output": 1, "hidden": true},
        {"input": [1, 10], "output": 1, "hidden": true},
        {"input": [23, 12], "output": 193536720, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'binary-tree-level-order-py',
    'Binary Tree Level Order Traversal',
    'Given the `root` of a binary tree, return the level order traversal of its nodes'' values. (i.e., from left to right, level by level).

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```
',
    'python',
    'medium',
    'def level_order(root):',
    'def level_order(root):
    pass',
    '[
        {"input": [{"val":3,"left":{"val":9},"right":{"val":20,"left":{"val":15},"right":{"val":7}}}], "output": [[3],[9,20],[15,7]], "hidden": false},
        {"input": [{"val":1}], "output": [[1]], "hidden": false},
        {"input": [], "output": [], "hidden": true},
        {"input": [{"val":1,"left":{"val":2},"right":{"val":3,"left":{"val":4,"left":{"val":5}}}}], "output": [[1],[2,3],[4],[5]], "hidden": true},
        {"input": [{"val":1,"left":{"val":2,"left":{"val":4}},"right":{"val":3,"right":{"val":5}}}], "output": [[1],[2,3],[4,5]], "hidden": true}
    ]'::jsonb
);

-- ==========================================
-- Python Hard Challenges (Continued)
-- ==========================================

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'find-median-stream-py',
    'Find Median from Data Stream',
    'The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.
Design a data structure that supports the following two operations:
- `void addNum(int num)` - Adds the integer `num` from the data stream to the data structure.
- `double findMedian()` - Returns the median of all elements so far.

**Example:**
```
addNum(1)
addNum(2)
findMedian() -> 1.5
addNum(3) 
findMedian() -> 2.0
```
',
    'python',
    'hard',
    'class MedianFinder:',
    'class MedianFinder:
    def __init__(self):
        pass

    def addNum(self, num: int) -> None:
        pass

    def findMedian(self) -> float:
        pass',
    '[]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'integer-to-english-py',
    'Integer to English Words',
    'Convert a non-negative integer `num` to its English words representation.

**Example 1:**
```
Input: num = 123
Output: "One Hundred Twenty Three"
```
',
    'python',
    'hard',
    'def number_to_words(num):',
    'def number_to_words(num):
    pass',
    '[
        {"input": [123], "output": "One Hundred Twenty Three", "hidden": false},
        {"input": [12345], "output": "Twelve Thousand Three Hundred Forty Five", "hidden": false},
        {"input": [1234567], "output": "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven", "hidden": true},
        {"input": [0], "output": "Zero", "hidden": true},
        {"input": [1000000], "output": "One Million", "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'wildcard-matching-py',
    'Wildcard Matching',
    'Given an input string (`s`) and a pattern (`p`), implement wildcard pattern matching with support for `?` and `*` where:
- `?` Matches any single character.
- `*` Matches any sequence of characters (including the empty sequence).
The matching should cover the **entire** input string (not partial).

**Example 1:**
```
Input: s = "aa", p = "a"
Output: false
```
',
    'python',
    'hard',
    'def is_match(s, p):',
    'def is_match(s, p):
    pass',
    '[
        {"input": ["aa", "a"], "output": false, "hidden": false},
        {"input": ["aa", "*"], "output": true, "hidden": false},
        {"input": ["cb", "?a"], "output": false, "hidden": true},
        {"input": ["adceb", "*a*b"], "output": true, "hidden": true},
        {"input": ["acdcb", "a*c?b"], "output": false, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'maximal-rectangle-py',
    'Maximal Rectangle',
    'Given a `rows x cols` binary matrix filled with `0`''s and `1`''s, find the largest rectangle containing only `1`''s and return its area.

**Example 1:**
```
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
```
',
    'python',
    'hard',
    'def maximal_rectangle(matrix):',
    'def maximal_rectangle(matrix):
    pass',
    '[
        {"input": [[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]], "output": 6, "hidden": false},
        {"input": [[]], "output": 0, "hidden": false},
        {"input": [[["0"]]], "output": 0, "hidden": true},
        {"input": [[["1"]]], "output": 1, "hidden": true},
        {"input": [[["0","0"]]], "output": 0, "hidden": true}
    ]'::jsonb
);

INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases) VALUES
(
    'palindrome-partitioning-ii-py',
    'Palindrome Partitioning II',
    'Given a string `s`, partition `s` such that every substring of the partition is a palindrome.
Return the minimum cuts needed for a palindrome partitioning of `s`.

**Example 1:**
```
Input: s = "aab"
Output: 1
```
',
    'python',
    'hard',
    'def min_cut(s):',
    'def min_cut(s):
    pass',
    '[
        {"input": ["aab"], "output": 1, "hidden": false},
        {"input": ["a"], "output": 0, "hidden": false},
        {"input": ["ab"], "output": 1, "hidden": true},
        {"input": ["efe"], "output": 0, "hidden": true},
        {"input": ["abbab"], "output": 2, "hidden": true}
    ]'::jsonb
);
