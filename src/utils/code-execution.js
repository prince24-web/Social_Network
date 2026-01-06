
/**
 * Executes user code against test cases.
 * 
 * @param {string} language - 'javascript' or 'python'
 * @param {string} userCode - The code written by the user
 * @param {Array} testCases - Array of { input: [], output: any }
 * @param {string} functionName - Name of the function to call (e.g., 'isValid')
 * @returns {Promise<{ results: Array, logs: Array }>}
 */
export async function executeCode(language, userCode, testCases, functionName) {
    if (language === 'javascript') {
        return executeJavaScript(userCode, testCases, functionName)
    }
    if (language === 'python') {
        return executePython(userCode, testCases, functionName)
    }
    if (language === 'cpp' || language === 'cplusplus' || language === 'c++') {
        return executeCpp(userCode, testCases, functionName)
    }
    throw new Error(`Language ${language} execution not yet implemented`)
}

async function executeJavaScript(userCode, testCases, functionName) {
    const logs = []
    const results = []

    // Capture console.log
    const originalConsoleLog = console.log
    const capturedLog = (...args) => {
        logs.push({ type: 'log', content: args.join(' ') })
    }

    try {
        // Create a safe-ish scope
        // We use new Function to run the user's code string.
        // We wrap it to return the target function.

        // 1. Prepare User Code
        // "return isValid" at the end to get the function reference
        const setupCode = `
            ${userCode}
            return ${functionName};
        `

        // 2. Compile
        // eslint-disable-next-line no-new-func
        const userFunction = new Function(setupCode)()

        if (typeof userFunction !== 'function') {
            throw new Error(`Function '${functionName}' not found in code.`)
        }

        // 3. Run Test Cases
        for (const [index, test] of testCases.entries()) {

            // Redirect console
            console.log = capturedLog

            let result
            let passed = false
            let error = null
            const startTime = performance.now()

            try {
                // Call function with spread inputs
                result = userFunction(...test.input)

                // Compare results (basic equality for now, need deepEqual for arrays/objects)
                passed = JSON.stringify(result) === JSON.stringify(test.output)

            } catch (err) {
                error = err.message
                passed = false
            } finally {
                const timeTaken = performance.now() - startTime

                results.push({
                    testIndex: index,
                    passed,
                    input: test.input,
                    expected: test.output,
                    actual: result,
                    error,
                    time: timeTaken.toFixed(2)
                })
            }
        }

    } catch (err) {
        logs.push({ type: 'error', content: `Syntax/Runtime Error: ${err.message}` })
    } finally {
        // Restore console
        console.log = originalConsoleLog
    }

    return { results, logs }
}

async function executePython(userCode, testCases, functionName) {
    // We use Piston API for Python execution
    const PISTON_API = "https://emkc.org/api/v2/piston/execute"

    // Construct Driver Code
    // We wrap the user's code and append a test runner
    const driverCode = `
import json
import sys

# --- USER CODE START ---
${userCode}
# --- USER CODE END ---

def run_tests():
    test_cases_json = '${JSON.stringify(testCases).replace(/'/g, "\\'")}'
    test_cases = json.loads(test_cases_json)
    results = []
    
    for i, test in enumerate(test_cases):
        args = test['input']
        expected = test['output']
        
        try:
            # Find function
            func = globals().get("${functionName}")
            if not func:
                raise Exception("Function ${functionName} not found")
            
            # Execute
            actual = func(*args)
            
            # Compare
            passed = actual == expected
            
            results.append({
                "testIndex": i,
                "passed": passed,
                "input": args,
                "expected": expected,
                "actual": actual,
                "error": None
            })
        except Exception as e:
             results.append({
                "testIndex": i,
                "passed": False,
                "input": args,
                "expected": expected,
                "actual": None,
                "error": str(e)
            })

    print("---RESULT_JSON_START---")
    print(json.dumps(results))

if __name__ == "__main__":
    try:
        run_tests()
    except Exception as e:
        print(f"Driver Error: {e}")
`

    try {
        const res = await fetch(PISTON_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                language: "python",
                version: "3.10.0",
                files: [{ content: driverCode }]
            })
        })

        const data = await res.json()

        if (data.run && data.run.output) {
            const rawOutput = data.run.output
            const parts = rawOutput.split("---RESULT_JSON_START---")

            const logsText = parts[0] // Stdout before result
            const jsonText = parts[1] // Result JSON

            // Parse logs
            const logs = logsText.trim().split('\n').filter(l => l).map(l => ({ type: 'log', content: l }))

            let results = []
            if (jsonText) {
                try {
                    results = JSON.parse(jsonText.trim())
                } catch (e) {
                    logs.push({ type: 'error', content: "Failed to parse test results." })
                }
            } else {
                logs.push({ type: 'error', content: "No results returned from execution." })
            }

            // Check for stderr in Piston response if needed, usually included in output if mixed
            if (data.run.stderr) {
                logs.push({ type: 'error', content: data.run.stderr })
            }

            return { results, logs }

        } else {
            throw new Error(data.message || "Execution failed")
        }

    } catch (err) {
        return {
            results: [],
            logs: [{ type: 'error', content: `Execution Error: ${err.message}` }]
        }
    }
}

async function executeCpp(userCode, testCases, functionName) {
    const PISTON_API = "https://emkc.org/api/v2/piston/execute"

    // Construct Driver Code
    // C++ driver is more complex due to header requirements and type handling
    // We assume the user code provides the function definition.
    // We generate a main() that runs the tests and prints results in JSON format.

    // Helper to escape strings for C++ literals
    const cppEscape = (val) => {
        if (typeof val === 'string') return `"${val.replace(/"/g, '\\"')}"`;
        if (Array.isArray(val)) {
            return `{${val.map(cppEscape).join(', ')}}`;
        }
        return JSON.stringify(val);
    };

    // Helper to determine C++ type for input/output
    // This is a simplified mapper; complex challenges might need refinement.
    const getCppType = (val) => {
        if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'double';
        if (typeof val === 'boolean') return 'bool';
        if (typeof val === 'string') return 'std::string';
        if (Array.isArray(val)) {
            if (val.length === 0) return 'std::vector<int>'; // Default
            return `std::vector<${getCppType(val[0])}>`;
        }
        return 'auto';
    };

    // Generate test invocation logic
    const testLines = testCases.map((test, i) => {
        const inputs = test.input.map(cppEscape).join(', ');
        const outputType = getCppType(test.output);
        const expected = cppEscape(test.output);

        return `
    {
        try {
            auto actual = ${functionName}(${inputs});
            bool passed = (actual == ${outputType}${expected});
            std::cout << "---TEST_RESULT---" << std::endl;
            std::cout << "{\\\"testIndex\\\": ${i}, \\\"passed\\\": " << (passed ? "true" : "false") << "}" << std::endl;
        } catch (const std::exception& e) {
            std::cout << "---TEST_RESULT---" << std::endl;
            std::cout << "{\\\"testIndex\\\": ${i}, \\\"passed\\\": false, \\\"error\\\": \\\"" << e.what() << "\\\"}" << std::endl;
        }
    }`;
    }).join('\n');

    const driverCode = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <set>
#include <stack>
#include <queue>
#include <cmath>
#include <sstream>

// --- USER CODE START ---
${userCode}
// --- USER CODE END ---

int main() {
    ${testLines}
    return 0;
}
`;

    try {
        const res = await fetch(PISTON_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                language: "cpp",
                version: "10.2.0",
                files: [{ content: driverCode }]
            })
        })

        const data = await res.json()

        if (data.run && data.run.output) {
            const lines = data.run.output.trim().split('\n');
            const logs = [];
            const results = [];

            for (let i = 0; i < lines.length; i++) {
                if (lines[i] === "---TEST_RESULT---" && lines[i + 1]) {
                    try {
                        results.push(JSON.parse(lines[i + 1]));
                        i++; // Skip the JSON line
                    } catch (e) {
                        logs.push({ type: 'log', content: lines[i] });
                    }
                } else {
                    logs.push({ type: 'log', content: lines[i] });
                }
            }

            if (data.run.stderr) {
                logs.push({ type: 'error', content: data.run.stderr });
            }

            // Map results to standard format
            const formattedResults = results.map((r, i) => ({
                ...r,
                input: testCases[r.testIndex].input,
                expected: testCases[r.testIndex].output,
                actual: "See Console" // C++ serialization to JS in driver is hard, so we rely on passed/failed bool mainly
            }));

            return { results: formattedResults, logs };
        } else {
            throw new Error(data.message || "Execution failed");
        }
    } catch (err) {
        return {
            results: [],
            logs: [{ type: 'error', content: `Execution Error: ${err.message}` }]
        }
    }
}

