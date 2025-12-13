
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"
import { MapPin, Briefcase, User, Github, Twitter, Linkedin, Instagram, Link as LinkIcon, MessageSquare, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, PillAvatar } from "@/components/kibo-ui/pill"
import { TECH_STACK, EXPERIENCE_LEVELS } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default async function ProfilePage({ params }) {
    const supabase = await createClient()
    const { username } = await params

    // Fetch profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single()

    if (!profile) {
        notFound()
    }

    const {
        display_name,
        full_name,
        avatar_url,
        bio,
        tech_stack,
        experience_level,
        location_country,
        location_state,
        social_links,
        gender
    } = profile

    // Helper to get experience label
    const experienceLabel = EXPERIENCE_LEVELS.find(l => l.id === experience_level)?.label || experience_level

    // Mock stats for now
    const stats = [
        { label: "Followers", value: 0, icon: Users },
        { label: "Following", value: 0, icon: Users },
        { label: "Posts", value: 0, icon: FileText },
        { label: "Replies", value: 0, icon: MessageSquare },
    ]

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Banner Area */}
            <div className="h-48 bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b" />

            <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Left Column: Avatar & Quick Info */}
                    <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
                        <div className="relative h-40 w-40 rounded-full border-4 border-background bg-muted shadow-xl overflow-hidden">
                            <img
                                src={avatar_url || `https://ui-avatars.com/api/?name=${display_name || username}&background=random`}
                                alt={display_name || username}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="text-center md:text-left space-y-1 w-full">
                            <h1 className="text-3xl font-bold">{display_name || full_name || username}</h1>
                            <p className="text-muted-foreground font-medium">@{username}</p>

                            {/* Gender Pill */}
                            {gender && (
                                <Badge variant="outline" className="mt-2 text-xs uppercase tracking-wider opacity-80">
                                    <User className="w-3 h-3 mr-1" /> {gender}
                                </Badge>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-2 mt-2">
                            {social_links?.github && (
                                <a href={`https://github.com/${social_links.github}`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#333] hover:text-white transition-colors">
                                        <Github className="h-4 w-4" />
                                    </Button>
                                </a>
                            )}
                            {social_links?.twitter && (
                                <a href={`https://twitter.com/${social_links.twitter}`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#1DA1F2] hover:text-white transition-colors">
                                        <Twitter className="h-4 w-4" />
                                    </Button>
                                </a>
                            )}
                            {social_links?.linkedin && (
                                <a href={`https://linkedin.com/in/${social_links.linkedin}`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#0077b5] hover:text-white transition-colors">
                                        <Linkedin className="h-4 w-4" />
                                    </Button>
                                </a>
                            )}
                            {social_links?.instagram && (
                                <a href={`https://instagram.com/${social_links.instagram}`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E4405F] hover:text-white transition-colors">
                                        <Instagram className="h-4 w-4" />
                                    </Button>
                                </a>
                            )}
                            {social_links?.tiktok && (
                                <a href={`https://tiktok.com/@${social_links.tiktok}`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#000] hover:text-white transition-colors">
                                        <LinkIcon className="h-4 w-4" />
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Bio, Stats, Stack */}
                    <div className="flex-1 space-y-8 w-full pt-8">

                        {/* Bio & Location Info */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{experienceLabel} Exp</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{location_state}, {location_country}</span>
                                </div>
                            </div>

                            <p className="text-lg leading-relaxed max-w-2xl">
                                {bio || "No bio yet."}
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col p-4 rounded-xl bg-card border hover:border-primary/50 transition-colors">
                                    <span className="text-2xl font-bold">{stat.value}</span>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
                                        <stat.icon className="h-3 w-3" />
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {tech_stack?.length > 0 ? tech_stack.map((techName) => {
                                    const techInfo = TECH_STACK.find(t => t.name === techName)
                                    return (
                                        <Pill key={techName} className="pointer-events-none">
                                            {techInfo?.logo && (
                                                <PillAvatar src={techInfo.logo} className={cn("mr-2 h-4 w-4", techInfo.invertDark && "dark:invert")} />
                                            )}
                                            {techName}
                                        </Pill>
                                    )
                                }) : (
                                    <span className="text-muted-foreground italic text-sm">No tech stack selected.</span>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Content Tabs (Placeholder) */}
                        <div className="space-y-4">
                            <div className="flex gap-6 border-b">
                                <button className="pb-3 border-b-2 border-primary font-medium text-foreground">Posts</button>
                                <button className="pb-3 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors">Replies</button>
                            </div>

                            <div className="py-8 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                                <p>No posts yet.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
