import { createClient } from "@/utils/supabase/server"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal, Crown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export default async function LeaderboardPage() {
    const supabase = await createClient()

    const { data: profiles, error } = await supabase
        .from("profiles")
        .select("username, display_name, avatar_url, points, id")
        .order("points", { ascending: false })
        .limit(50)

    if (error) {
        console.error("Error fetching leaderboard:", error)
    }

    return (
        <div className="min-h-screen bg-background p-6 md:p-24">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        Global Rankings
                    </h1>
                    <p className="text-muted-foreground">
                        Compete against the best developers in the Hive.
                    </p>
                </div>

                <div className="grid gap-4">
                    {profiles?.map((profile, index) => {
                        const rank = index + 1
                        const isTop3 = rank <= 3

                        return (
                            <Link href={`/u/${profile.username}`} key={profile.id}>
                                <Card className={cn(
                                    "transition-all hover:scale-[1.01] hover:shadow-lg border-l-4",
                                    rank === 1 ? "border-l-yellow-500 bg-yellow-500/5" :
                                        rank === 2 ? "border-l-gray-400 bg-gray-400/5" :
                                            rank === 3 ? "border-l-orange-500 bg-orange-500/5" :
                                                "border-l-transparent"
                                )}>
                                    <CardContent className="flex items-center gap-4 p-4 md:p-6">

                                        {/* Rank */}
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center font-bold text-xl md:text-2xl min-w-[3rem]">
                                            {rank === 1 && <Trophy className="h-6 w-6 text-yellow-500" />}
                                            {rank === 2 && <Medal className="h-6 w-6 text-gray-400" />}
                                            {rank === 3 && <Medal className="h-6 w-6 text-orange-500" />}
                                            {rank > 3 && <span className="text-muted-foreground">#{rank}</span>}
                                        </div>

                                        {/* Avatar */}
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden border bg-muted shrink-0">
                                            <img
                                                src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.display_name || profile.username}&background=random`}
                                                alt={profile.username}
                                                className="h-full w-full object-cover"
                                            />
                                            {rank === 1 && (
                                                <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-[2px]">
                                                    <Crown className="w-3 h-3 text-white fill-current" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Name */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold truncate text-lg">
                                                {profile.display_name || profile.username}
                                            </div>
                                            <div className="text-sm text-muted-foreground truncate">
                                                @{profile.username}
                                            </div>
                                        </div>

                                        {/* Points */}
                                        <div className="text-right shrink-0">
                                            <div className="font-mono text-2xl font-bold tracking-tight">
                                                {profile.points || 0}
                                            </div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                                Points
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}

                    {(!profiles || profiles.length === 0) && (
                        <div className="text-center py-12 text-muted-foreground">
                            No active players yet. Be the first to join the ranks!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
