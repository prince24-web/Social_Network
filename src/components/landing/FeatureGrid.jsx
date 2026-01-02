import { Zap, Globe, Trophy, Terminal, Cpu, Users } from "lucide-react";

const features = [
  {
    name: "Real-Time Multiplayer",
    description: "Battle against other developers in real-time. See their cursor moves and code updates instantly.",
    icon: Zap,
  },
  {
    name: "Multiple Languages",
    description: "Support for JavaScript, Python, C++, and more. Choose your weapon of choice.",
    icon: Globe,
  },
  {
    name: "Live Leaderboards",
    description: "Climb the global rankings and prove you are the best coder in the arena.",
    icon: Trophy,
  },
  {
    name: "Instant Feedback",
    description: "Run your code against test cases and get immediate results. Debug on the fly.",
    icon: Terminal,
  },
  {
    name: "Performance Analytics",
    description: "Track your coding speed, accuracy, and win rates with detailed post-match stats.",
    icon: Cpu,
  },
  {
    name: "Developer Community",
    description: "Join a thriving community of developers. Share solutions, discuss strategies, and grow together.",
    icon: Users,
  },
];

export function FeatureGrid() {
  return (
    <div className="py-24 sm:py-32 bg-transparent z-10 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-400">Deploy your skills</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to master code
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            DevDuel provides a complete ecosystem for competitive programming and skill enhancement.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-600/20 group-hover:bg-purple-600/40 transition-colors">
                    <feature.icon className="h-6 w-6 text-purple-400 group-hover:text-purple-300" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
