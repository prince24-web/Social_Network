import Link from 'next/link';
import { DemoBattleSimulator } from '@/components/demo/DemoBattleSimulator';
import { Footer } from '@/components/landing/Footer';
import { Zap, Shield, Trophy } from 'lucide-react';

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30">

            {/* Navbar Placeholder - or just a simple Back button */}
            <nav className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center max-w-7xl mx-auto inset-x-0">
                <Link href="/" className="text-xl font-bold tracking-tight hover:text-blue-400 transition-colors">
                    DevDue<span className="text-blue-500">l</span>
                </Link>
                <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Sign In
                </Link>
            </nav>

            {/* Hero Section of Demo */}
            <div className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 px-6 flex flex-col items-center text-center">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[100px] rounded-full -z-10" />

                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl mx-auto mb-6">
                    Experience the <span className="text-blue-500">Arena</span>
                </h1>
                <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                    Watch a simulated battle between two developers. Real-time coding, live test cases, and the thrill of competition.
                </p>

                {/* The Battle Simulator */}
                <DemoBattleSimulator />

                {/* CTA Section */}
                <div className="mt-20 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Ready for the real thing?</h2>
                    <p className="text-gray-400 mb-8 max-w-md">
                        Join thousands of developers competing daily to sharpen their skills and climb the leaderboard.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/start"
                            className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                            <Zap className="w-4 h-4" /> Start Battling Now
                        </Link>
                        <Link
                            href="/"
                            className="rounded-full bg-white/5 border border-white/10 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all duration-300"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Recap */}
            <div className="py-20 border-t border-white/5 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#1e1e1e] p-6 rounded-xl border border-white/5">
                        <Shield className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Fair Matching</h3>
                        <p className="text-gray-400 text-sm">Our ELO-based matchmaking ensures you always face opponents at your skill level.</p>
                    </div>
                    <div className="bg-[#1e1e1e] p-6 rounded-xl border border-white/5">
                        <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Global Leaderboards</h3>
                        <p className="text-gray-400 text-sm">Climb the ranks and earn badges as you defeat opponents and master new languages.</p>
                    </div>
                    <div className="bg-[#1e1e1e] p-6 rounded-xl border border-white/5">
                        <Zap className="w-8 h-8 text-purple-500 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Instant Feedback</h3>
                        <p className="text-gray-400 text-sm">Run your code against hidden test cases and get immediate results during battle.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
