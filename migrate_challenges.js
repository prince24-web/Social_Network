
const fs = require('fs');
const path = require('path');

const output = [];

// Header
output.push(`-- Seed All Challenges`);
output.push(`-- This file is auto-generated`);
output.push(`TRUNCATE TABLE challenges;`); // Clear existing data to avoid duplicates

const baseDir = path.join(__dirname, 'src', 'challenges');
const languages = ['javascript_challenges', 'python_challenges'];

languages.forEach(langDir => {
    const langPath = path.join(baseDir, langDir);
    if (!fs.existsSync(langPath)) return;

    const difficulties = ['easy', 'medium', 'hard'];

    difficulties.forEach(diff => {
        const diffPath = path.join(langPath, diff);
        const jsonFile = path.join(diffPath, `${diff}_challenges.json`);

        if (fs.existsSync(jsonFile)) {
            const content = fs.readFileSync(jsonFile, 'utf-8');
            try {
                const challenges = JSON.parse(content);
                challenges.forEach(c => {
                    const lang = langDir.includes('python') ? 'python' : 'javascript';
                    const uniqueId = `${c.id}-${lang === 'python' ? 'py' : 'js'}`;

                    // Escape single quotes for SQL
                    const escape = (str) => str ? str.replace(/'/g, "''") : '';

                    // Combine hidden tests if needed, or just use testCases
                    // Ideally we store hiddenTests too, but schema only has one column for now?
                    // Let's assume we store visible tests in 'test_cases'.
                    // If we want hidden tests, we might need to modify schema or merge them.
                    // For now, let's just use 'testCases'.

                    const insertSQL = `
INSERT INTO challenges (id, title, description, language, difficulty, function_signature, starter_code, test_cases)
VALUES (
    '${uniqueId}',
    '${escape(c.title)}',
    '${escape(c.description)}',
    '${lang}',
    '${diff}',
    '${escape(c.functionSignature)}',
    '${escape(c.starterCode)}',
    '${JSON.stringify(c.testCases || []).replace(/'/g, "''")}'::jsonb
);`;
                    output.push(insertSQL);
                });
            } catch (e) {
                console.error(`Error parsing ${jsonFile}:`, e);
            }
        }
    });
});

fs.writeFileSync('seed_all_challenges.sql', output.join('\n'));
console.log('Migration script generated seed_all_challenges.sql');
