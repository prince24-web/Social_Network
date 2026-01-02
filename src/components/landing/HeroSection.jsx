import Link from "next/link";
import { Play } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative isolate pt-14 dark:bg-gray-900 min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Gradients and Effects */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="py-24 sm:py-32 lg:pb-40 relative z-10 text-center">
        {/* Pill Label */}
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
            The ultimate coding arena is here.{" "}
            <Link href="/manual" className="font-semibold text-purple-400 hover:text-purple-300">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
          The Fastest Way to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Sharpen Your Coding Skills
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
          DevDuel is the ultimate coding arena. Challenge developers, climb the leaderboard, and master your craft in real-time battles.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/start"
            className="rounded-full bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 transition-all duration-300 hover:scale-105"
          >
            Start Battling
          </Link>
          <Link
            href="/demo"
            className="group flex items-center gap-2 text-sm font-semibold leading-6 text-white hover:text-purple-300 transition-colors"
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                 <Play className="h-4 w-4 fill-current" />
            </div>
            View Demo
          </Link>
        </div>
      </div>

       {/* Glowing Arc/Horizontal Line Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[500px] border-t border-purple-500/20 rounded-[100%] opacity-50 blur-3xl pointer-events-none -z-10 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      
      {/* Decorative Glow at bottom */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
