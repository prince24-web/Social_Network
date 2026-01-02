'use client';

import { useState, useEffect } from 'react';
import { Check, Clock, Terminal } from 'lucide-react';

const CHALLENGE_CODE = `function findTwoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`;

const OPPONENT_CODE = `function findTwoSum(nums, target) {
  // Brute force approach
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`;

export function DemoBattleSimulator() {
  const [playerCode, setPlayerCode] = useState('');
  const [opponentCode, setOpponentCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isRunning, setIsRunning] = useState(true);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);

  // Simulate Typing
  useEffect(() => {
    if (!isRunning) return;

    let playerIndex = 0;
    let opponentIndex = 0;

    const interval = setInterval(() => {
      // Player types slightly faster
      if (playerIndex < CHALLENGE_CODE.length) {
        setPlayerCode(CHALLENGE_CODE.slice(0, playerIndex + 1));
        playerIndex++;
        setPlayerProgress(Math.floor((playerIndex / CHALLENGE_CODE.length) * 100));
      }

      // Opponent types
      if (opponentIndex < OPPONENT_CODE.length) {
        setOpponentCode(OPPONENT_CODE.slice(0, opponentIndex + 1));
        opponentIndex++;
        setOpponentProgress(Math.floor((opponentIndex / OPPONENT_CODE.length) * 100));
      }

      // Reset when both finished
      if (playerIndex >= CHALLENGE_CODE.length && opponentIndex >= OPPONENT_CODE.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPlayerCode('');
          setOpponentCode('');
          setPlayerProgress(0);
          setOpponentProgress(0);
          playerIndex = 0;
          opponentIndex = 0;
          // Restart simulation
          setIsRunning(false);
          setTimeout(() => setIsRunning(true), 100);
        }, 5000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Simulate Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* HUD Header */}
      <div className="flex items-center justify-between mb-6 bg-[#1A1C20] p-4 rounded-xl border border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-mono mb-1">YOU</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                <span className="text-blue-400 text-xs font-bold">P1</span>
              </div>
              <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300 ease-out" 
                  style={{ width: `${playerProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
           <div className="bg-gray-900 px-4 py-1 rounded-md border border-white/5 flex items-center gap-2 mb-1">
             <Clock className="w-4 h-4 text-gray-400" />
             <span className="font-mono text-xl font-bold text-white">{formatTime(timeLeft)}</span>
           </div>
           <span className="text-[10px] text-gray-500 tracking-wider">RANKED MATCH</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400 font-mono mb-1">OPPONENT</span>
            <div className="flex items-center gap-2">
               <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all duration-300 ease-out" 
                  style={{ width: `${opponentProgress}%` }}
                />
              </div>
              <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                <span className="text-red-400 text-xs font-bold">P2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editors Split View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Player Editor */}
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] relative group">
          <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="ml-3 text-xs text-gray-400 font-mono">solution.js</span>
            </div>
            <div className="text-xs text-blue-400 font-mono">JAVASCRIPT</div>
          </div>
          <div className="p-4 h-[400px] font-mono text-sm overflow-hidden relative">
            <pre className="text-gray-300 relative z-10 whitespace-pre-wrap">
              <code>
                {playerCode}
                <span className="inline-block w-2 h-4 bg-blue-500 align-middle ml-0.5 animate-pulse" />
              </code>
            </pre>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
          </div>
          
          {/* Simulated Console/Results Area */}
          <div className="border-t border-white/5 bg-[#1e1e1e] p-3">
             <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
               <Terminal className="w-3 h-3" />
               <span>Test Results</span>
             </div>
             <div className="space-y-1">
               {playerProgress > 30 && (
                 <div className="flex items-center gap-2 text-xs text-green-400 bg-green-900/10 p-1.5 rounded animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <Check className="w-3 h-3" /> Test Case 1 Passed
                 </div>
               )}
               {playerProgress > 60 && (
                 <div className="flex items-center gap-2 text-xs text-green-400 bg-green-900/10 p-1.5 rounded animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <Check className="w-3 h-3" /> Test Case 2 Passed
                 </div>
               )}
                {playerProgress > 90 && (
                 <div className="flex items-center gap-2 text-xs text-green-400 bg-green-900/10 p-1.5 rounded animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <Check className="w-3 h-3" /> Test Case 3 Passed
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Opponent Editor - Slightly Dimmed */}
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/5 opacity-80 scale-[0.98] blur-[0.5px]">
           <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-600" />
                <div className="w-3 h-3 rounded-full bg-gray-600" />
                <div className="w-3 h-3 rounded-full bg-gray-600" />
              </div>
              <span className="ml-3 text-xs text-gray-500 font-mono">opponent.js</span>
            </div>
            <div className="text-xs text-gray-600 font-mono">JAVASCRIPT</div>
          </div>
          <div className="p-4 h-[400px] font-mono text-sm overflow-hidden text-gray-500">
             <pre className="whitespace-pre-wrap">
              <code>
                {opponentCode}
                <span className="inline-block w-2 h-4 bg-gray-600 align-middle ml-0.5 animate-pulse" />
              </code>
            </pre>
          </div>
            <div className="border-t border-white/5 bg-[#1e1e1e] p-3">
             <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
               <Terminal className="w-3 h-3" />
               <span>Test Results</span>
             </div>
             <div className="space-y-1">
               {opponentProgress > 40 && (
                 <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 p-1.5 rounded animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <Check className="w-3 h-3" /> Test Case 1 Passed
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
