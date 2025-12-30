'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippet = `function battle(player1, player2) {
  const arena = new Arena();
  
  arena.on('start', () => {
    console.log("Fight!");
    
    // Player 1 implementation
    player1.executeStrategy();
    
    // Player 2 implementation
    player2.executeStrategy();
  });
  
  return arena.winner;
}`;

export function CodeEditorDemo() {
  const [text, setText] = useState('');
  const [lineCount, setLineCount] = useState(1);
  const fullText = codeSnippet;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
            currentIndex = 0;
            setText('');
        }, 5000); // Reset after 5 seconds
      }
    }, 50);

    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
      setLineCount(text.split('\n').length);
  }, [text]);

  return (
    <motion.div 
        className="w-full max-w-lg bg-[#1e1e1e] rounded-lg shadow-2xl border border-white/10 overflow-hidden font-mono text-sm relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
      {/* Title Bar */}
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-white/5">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-gray-400 text-xs">arena_logic.js</div>
      </div>

      {/* Editor Content */}
      <div className="p-4 overflow-hidden h-[300px] relative">
        <div className="flex">
            {/* Line Numbers */}
            <div className="flex flex-col text-right pr-4 text-gray-600 select-none">
                {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i + 1}>{i + 1}</span>
                ))}
            </div>

            {/* Code */}
            <pre className="text-gray-300 flex-1 whitespace-pre-wrap font-mono relative">
              <code className="language-javascript">
                {text}
                <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2.5 h-4 bg-blue-400 align-middle ml-1"
                />
              </code>
            </pre>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="px-4 py-1 bg-[#007acc] text-white text-[10px] flex justify-between items-center">
        <div>JAVASCRIPT</div>
        <div>Ln {lineCount}, Col {text.length}</div>
      </div>
    </motion.div>
  );
}
