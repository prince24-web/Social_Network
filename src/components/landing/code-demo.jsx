"use client";

import { useEffect, useState } from "react";

const CODE_SAMPLE = `function solveChallenge(input) {
  // Parsing the input
  const data = JSON.parse(input);
  
  // Implementing the optimized solution
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] % 2 === 0) {
      result.push(data[i] * 2);
    }
  }
  
  return result;
}

// Running tests...
// Test Case 1: [Passed]
// Test Case 2: [Passed]
// Test Case 3: [Passed]`;

export function CodeDemo() {
  const [displayedCode, setDisplayedCode] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= CODE_SAMPLE.length) {
        setDisplayedCode(CODE_SAMPLE.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          currentIndex = 0;
          setDisplayedCode("");
        }, 5000); // Reset after 5 seconds
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Real-time Code Execution</h2>
            <p className="text-lg text-muted-foreground">
              Experience a powerful in-browser IDE that supports multiple languages. 
              Write, debug, and run your code instantly against hidden test cases.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Syntax Highlighting
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Intelligent Autocomplete
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Instant Feedback
              </li>
            </ul>
          </div>

          <div 
            className="flex-1 w-full max-w-2xl animate-slide-in-right hidden md:block"
            style={{ opacity: 0 }}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] border border-gray-800">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-gray-400 font-mono">solution.js</span>
              </div>
              <div className="p-6 h-[400px] overflow-hidden">
                <pre className="font-mono text-sm md:text-base text-gray-300">
                  <code>
                    {displayedCode}
                    <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse align-middle"></span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
