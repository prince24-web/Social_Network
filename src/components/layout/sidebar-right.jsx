"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SidebarRight({ className }) {
    return (
        <aside className={cn("flex flex-col gap-6 py-6 h-[calc(100vh-3.5rem)] sticky top-14", className)}>
            
            {/* Pro Upsell */}
            <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Zap className="h-5 w-5 text-primary fill-primary" />
                        <span>D-Hive Pro</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Unlock advanced stats, custom themes, and prioritize your content.
                    </p>
                    <Button className="w-full font-semibold" size="sm">Upgrade to Pro</Button>
                </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-card/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        Trending Tech
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { tag: "#rustlang", posts: "12k posts" },
                        { tag: "#ai_dev", posts: "8.5k posts" },
                        { tag: "#nextjs15", posts: "5k posts" },
                        { tag: "#web3", posts: "3.2k posts" }
                    ].map((topic) => (
                        <div key={topic.tag} className="flex items-center justify-between group cursor-pointer">
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium group-hover:text-primary transition-colors">{topic.tag}</p>
                                <p className="text-xs text-muted-foreground">{topic.posts}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Suggested Connections (Rising Stars) */}
            <Card className="bg-card/50">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                        Rising Stars
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                            <div className="flex-1 space-y-1">
                                <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                                <div className="h-2 w-12 bg-muted rounded animate-pulse" />
                            </div>
                            <Button size="icon" variant="ghost" className="h-7 w-7">
                                +
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </aside>
    )
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ")
}
