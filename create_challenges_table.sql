-- Create challenges table
create table challenges (
  id text primary key, -- e.g. 'two-sum'
  title text not null,
  description text not null, -- markdown
  language text not null check (language in ('javascript', 'python')),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  function_signature text not null,
  starter_code text not null,
  test_cases jsonb not null, -- Array of objects: [{"input": [...], "output": ...}]
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table challenges enable row level security;

create policy "Challenges are viewable by everyone"
  on challenges for select
  to authenticated
  using (true);

-- Seed Data (Example Medium Challenges)

-- 1. Valid Parentheses (JS)
insert into challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
values (
  'valid-parentheses-js',
  'Valid Parentheses',
  'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

**Example 1:**
```
Input: s = "()"
Output: true
```

**Example 2:**
```
Input: s = "()[]{}"
Output: true
```',
  'javascript',
  'medium',
  'function isValid(s)',
  'function isValid(s) {
  
}',
  '[
    {"input": ["()"], "output": true},
    {"input": ["()[]{}"], "output": true},
    {"input": ["(]"], "output": false}
  ]'::jsonb
);

-- 2. Longest Word (JS)
insert into challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
values (
  'longest-word-js',
  'Longest Word',
  'Return the longest word in a given sentence. If there are multiple words with the same length, return the first one.

**Example:**
```js
longestWord("I love JavaScript") // "JavaScript"
```',
  'javascript',
  'medium',
  'function longestWord(sentence)',
  'function longestWord(sentence) {
  
}',
  '[
    {"input": ["I love JavaScript"], "output": "JavaScript"},
    {"input": ["Hello world"], "output": "Hello"}
  ]'::jsonb
);

-- 3. Valid Parentheses (Python)
insert into challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
values (
  'valid-parentheses-py',
  'Valid Parentheses',
  'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.',
  'python',
  'medium',
  'def is_valid(s):',
  'def is_valid(s):
    pass',
  '[
    {"input": ["()"], "output": true},
    {"input": ["()[]{}"], "output": true},
    {"input": ["(]"], "output": false}
  ]'::jsonb
);
