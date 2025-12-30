'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeEditorDemo } from "./CodeEditorDemo";
import { FloatingIcons } from "./FloatingIcons";
import { FeaturesGrid } from "./FeaturesGrid";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-white pt-20 pb-10">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
      <FloatingIcons />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center gap-12 text-center">
        
        {/* Main Content */}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white animate-pulse">
            DevDuel
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-[600px] mx-auto">
            The Ultimate Coding Arena. Practice, Battle, and Dominate the Leaderboards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-8">
                Start Battling
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Demo */}
        <div className="w-full flex justify-center perspective-[2000px]">
             <div className="transform rotate-x-12 hover:rotate-0 transition-transform duration-700 ease-out">
                <CodeEditorDemo />
             </div>
        </div>

        {/* Features Grid */}
        <div className="w-full pt-16">
            <FeaturesGrid />
        </div>

      </div>
    </section>
  );
}
