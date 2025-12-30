import { Terminal, Trophy, Users, Swords } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Training Mode",
    description: "Sharpen your logic with endless algorithmic challenges and track your progress.",
    icon: Terminal,
    color: "text-green-500",
  },
  {
    title: "1v1 Battles",
    description: "Challenge friends or random opponents to real-time coding duels.",
    icon: Swords,
    color: "text-red-500",
  },
  {
    title: "Leaderboards",
    description: "Climb the global ranks and prove your dominance in various languages.",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    title: "Community",
    description: "Join a hive of developers, share solutions, and learn from the best.",
    icon: Users,
    color: "text-blue-500",
  },
];

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto px-4 z-10 relative">
      {features.map((feature, index) => (
        <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-sm hover:bg-black/60 transition-colors">
          <CardHeader className="pb-2">
            <feature.icon className={`w-10 h-10 ${feature.color} mb-2`} />
            <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
