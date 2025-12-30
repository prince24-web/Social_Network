"use client";

import { FaCode, FaTrophy, FaBrain, FaRocket } from "react-icons/fa";

const features = [
  {
    icon: FaCode,
    title: "Code Practices & Training",
    description: "Sharpen your skills with a vast library of challenges ranging from easy to hard. diverse topics including Arrays, DP, and Graphs.",
    color: "text-blue-500"
  },
  {
    icon: FaTrophy,
    title: "Live Code Battles",
    description: "Challenge your friends or match with random opponents in real-time. Race against the clock and the leaderboard.",
    color: "text-yellow-500"
  },
  {
    icon: FaBrain,
    title: "Critical Thinking",
    description: "Develop algorithmic thinking and problem-solving strategies that are essential for technical interviews and real-world development.",
    color: "text-purple-500"
  },
  {
    icon: FaRocket,
    title: "Career Growth",
    description: "Build a portfolio of solved challenges and improved ratings that showcase your technical prowess to potential employers.",
    color: "text-red-500"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Why DevDuel?</h2>
          <p className="text-xl text-muted-foreground">
            More than just a coding platform. It's a gymnasium for your mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow animate-fade-in-up"
              style={{ 
                opacity: 0, 
                animationDelay: `${index * 0.1}s` 
              }}
            >
              <div className={`text-4xl mb-4 ${feature.color}`}>
                <feature.icon />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
