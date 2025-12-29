"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Hash, Users, MessageSquare, Bookmark, Settings, Code, Zap, Trophy } from "lucide-react"

const sidebarItems = [
    { icon: Home, label: "My Feed", href: "/" },
    { icon: Zap, label: "Training", href: "/training" },
    { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
    { icon: Hash, label: "Explore", href: "/explore" },
    { icon: Users, label: "Groups", href: "/groups" },
    { icon: MessageSquare, label: "Messages", href: "/messages", badge: 3 },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
]

const officialChannels = [
    { icon: Code, label: "VS Code", href: "/c/vscode", color: "text-blue-500" },
    { icon: Zap, label: "Next.js", href: "/c/nextjs", color: "text-white" },
    { icon: Settings, label: "React", href: "/c/react", color: "text-cyan-400" },
]

export function SidebarLeft({ className }) {
    const pathname = usePathname()

    return (
        <aside className={cn("flex flex-col gap-6 py-6 h-[calc(100vh-3.5rem)] sticky top-14", className)}>
            
            {/* Main Navigation */}
            <div className="space-y-1 px-2">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            pathname === item.href 
                                ? "bg-accent text-accent-foreground font-semibold" 
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                {item.badge}
                            </span>
                        )}
                    </Link>
                ))}
            </div>

            {/* Separator if needed, or spacing */}
            
            {/* Topics / Channels */}
            <div className="px-4 mt-4">
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Official Channels
                </h3>
                <div className="space-y-1">
                    {officialChannels.map((channel) => (
                        <Link
                            key={channel.href}
                            href={channel.href}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/50"
                        >
                            <div className={cn("p-1 rounded bg-muted/20", channel.color)}>
                                <channel.icon className="h-4 w-4" />
                            </div>
                            <span>{channel.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

        </aside>
    )
}
