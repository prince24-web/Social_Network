
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
    // Python will be added later
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
