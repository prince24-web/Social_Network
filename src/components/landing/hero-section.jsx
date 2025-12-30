"use client";

import Link from "next/link";
import { FaPython, FaJs, FaReact, FaJava, FaRust } from "react-icons/fa";
import { SiCplusplus, SiTypescript, SiGo } from "react-icons/si";

export function HeroSection() {
  const floatingIcons = [
    { Icon: FaPython, color: "#3776AB", delay: "0s" },
    { Icon: FaJs, color: "#F7DF1E", delay: "1s" },
    { Icon: SiCplusplus, color: "#00599C", delay: "2s" },
    { Icon: SiTypescript, color: "#3178C6", delay: "3s" },
    { Icon: FaReact, color: "#61DAFB", delay: "1.5s" },
    { Icon: FaJava, color: "#007396", delay: "2.5s" },
    { Icon: SiGo, color: "#00ADD8", delay: "0.5s" },
    { Icon: FaRust, color: "#DEA584", delay: "3.5s" },
  ];

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, color, delay }, index) => (
        <div
          key={index}
          className="absolute z-10 opacity-20 text-4xl md:text-6xl animate-float"
          style={{ 
            color: color,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            animationDelay: delay
          }}
        >
          <Icon />
        </div>
      ))}

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8">
        <h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0s" }}
        >
          Master Coding through Combat
        </h1>
        
        <p 
          className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.2s" }}
        >
          Battle real players, solve complex algorithms, and level up your development skills in real-time arenas.
        </p>
        
        <div 
          className="animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.4s" }}
        >
          <Link 
            href="/login" 
            className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-105 transition-transform duration-200"
          >
            Start Battling
          </Link>
        </div>
      </div>
    </section>
  );
}
