"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, MoreHorizontal, Code2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function PostCard({ post }) {
    return (
        <Card className="border-border/60 hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-2">
                <div className="flex gap-3">
                    <Link href={`/u/${post.author.username}`}>
                        <div className="h-10 w-10 text-xl flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold overflow-hidden">
                             {post.author.avatar ? (
                                <img src={post.author.avatar} alt={post.author.username} className="h-full w-full object-cover" />
                             ) : (
                                post.author.username[0].toUpperCase()
                             )}
                        </div>
                    </Link>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Link href={`/u/${post.author.username}`} className="font-semibold hover:underline">
                                {post.author.name}
                            </Link>
                            {post.author.verified && (
                                <span className="text-blue-500">
                                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                                </span>
                            )}
                            <span className="text-xs text-muted-foreground">@{post.author.username}</span>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="text-xs text-muted-foreground">{post.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                            {post.author.role}
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-4">
                <p className="whitespace-pre-wrap leading-relaxed">
                    {post.content}
                </p>
                
                {post.codeSnippet && (
                    <div className="relative rounded-md bg-muted/50 p-4 font-mono text-sm border overflow-x-auto">
                        <div className="absolute right-4 top-4 text-xs text-muted-foreground flex items-center gap-1">
                            <Code2 className="h-3 w-3" /> {post.language}
                        </div>
                        <pre>
                            <code>{post.codeSnippet}</code>
                        </pre>
                    </div>
                )}
            </CardContent>
            
            {/* Action Bar */}
            <div className="p-4 pt-0">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500 group">
                        <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-500 group">
                        <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span>{post.comments}</span>
                    </Button>
                     <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-500 group">
                        <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span>Share</span>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
