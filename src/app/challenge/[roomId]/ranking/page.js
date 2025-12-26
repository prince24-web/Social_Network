"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trophy, Clock, XCircle, CheckCircle, Home, RotateCcw, Eye, Code } from "lucide-react"
import Loader from "@/components/ui/loader"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    CodeBlock,
    CodeBlockBody,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockItem
} from "@/components/kibo-ui/code-block"

export default function RankingPage({ params }) {
    const router = useRouter()
    const supabase = React.useMemo(() => createClient(), [])

    const [roomId, setRoomId] = React.useState(null)
    const [room, setRoom] = React.useState(null)
    const [participants, setParticipants] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [currentUser, setCurrentUser] = React.useState(null)
    const [inspectedParticipant, setInspectedParticipant] = React.useState(null)

    // Unwrap params
    React.useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params
            setRoomId(resolvedParams.roomId)
        }
        unwrapParams()
    }, [params])

    const fetchData = React.useCallback(async () => {
        if (!roomId) return

        try {
            // Get Current User
            const { data: { user } } = await supabase.auth.getUser()
            setCurrentUser(user)

            // Get Room
            const { data: roomData, error: roomError } = await supabase
                .from("challenge_rooms")
                .select("*")
                .eq("id", roomId)
                .single()

            if (roomError) throw roomError
            setRoom(roomData)

            // 1. Get Participants (Raw)
            const { data: parts, error: partsError } = await supabase
                .from("participants")
                .select("*")
                .eq("challenge_room_id", roomId)

            if (partsError) throw partsError

            // 2. Get Profiles
            const userIds = parts.map(p => p.user_id)
            let profiles = []

            if (userIds.length > 0) {
                const { data: profs, error: profError } = await supabase
                    .from("profiles")
                    .select("id, username, display_name, avatar_url")
                    .in("id", userIds)

                if (profError) {
                    console.error("Profile fetch error:", profError)
                } else {
                    profiles = profs
                }
            }

            // Merge
            const merged = parts.map(p => {
                const prof = profiles?.find(prof => prof.id === p.user_id)
                return { ...p, ...prof }
            })

            // Sort Logic
            // 1. Completed first
            // 2. Faster time (duration)

            const ranked = merged.sort((a, b) => {
                if (a.has_completed && !b.has_completed) return -1
                if (!a.has_completed && b.has_completed) return 1

                if (a.has_completed && b.has_completed) {
                    const durationA = new Date(a.completed_at) - new Date(a.started_at)
                    const durationB = new Date(b.completed_at) - new Date(b.started_at)
                    return durationA - durationB
                }

                return 0
            })

            setParticipants(ranked)

        } catch (err) {
            console.error("Fetch Data Error:", err)
        } finally {
            setLoading(false)
        }
    }, [roomId, supabase])

    React.useEffect(() => {
        fetchData()

        // Realtime Subscription for updates
        if (!roomId) return
        const channel = supabase
            .channel(`ranking:${roomId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'participants', filter: `challenge_room_id=eq.${roomId}` }, () => {
                fetchData()
            })
            .subscribe()

        // Polling Fallback (Reliability)
        const interval = setInterval(fetchData, 3000)

        return () => {
            supabase.removeChannel(channel)
            clearInterval(interval)
        }
    }, [fetchData, roomId, supabase])

    const formatDuration = (start, end) => {
        if (!start || !end) return "--:--"
        const diff = Math.floor((new Date(end) - new Date(start)) / 1000)
        const mins = Math.floor(diff / 60).toString().padStart(2, '0')
        const secs = (diff % 60).toString().padStart(2, '0')
        return `${mins}:${secs}`
    }

    if (loading) return <div className="h-screen w-full relative bg-background"><Loader /></div>

    if (!room) return <div className="flex h-screen items-center justify-center">Room not found</div>

    return (
        <div className="min-h-screen bg-muted/30 p-4 flex items-center justify-center">
            <Card className="w-full max-w-4xl shadow-xl border-none ring-1 ring-white/10">
                <CardHeader className="text-center pb-8 pt-8 bg-card rounded-t-xl">
                    <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4 animate-bounce" />
                    <CardTitle className="text-3xl font-bold tracking-tight">Challenge Results</CardTitle>
                    <p className="text-muted-foreground">The coding dust has settled.</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="bg-card rounded-lg border overflow-hidden">
                        {participants.map((p, index) => {
                            const isMe = p.user_id === currentUser?.id
                            const duration = formatDuration(p.started_at, p.completed_at)

                            return (
                                <div key={p.user_id} className={`flex items-center p-4 border-b last:border-0 ${isMe ? 'bg-primary/5' : ''}`}>
                                    <div className="w-12 text-center font-bold text-xl text-muted-foreground shrink-0">
                                        #{index + 1}
                                    </div>

                                    <div
                                        className="flex items-center gap-3 flex-1 cursor-pointer hover:opacity-80 transition-opacity min-w-0"
                                        onClick={() => {
                                            if (p.username) router.push(`/u/${p.username}`)
                                        }}
                                    >
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-muted overflow-hidden border">
                                            <img
                                                src={p.avatar_url || `https://ui-avatars.com/api/?name=${p.username || 'User'}&background=random`}
                                                alt={p.username}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-semibold flex items-center gap-2 truncate">
                                                {p.display_name || p.username || 'Unknown'}
                                                {isMe && <Badge variant="secondary" className="text-[10px]">YOU</Badge>}
                                            </span>
                                            <span className="text-xs text-muted-foreground capitalize">
                                                {p.status || 'playing'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 ml-auto">

                                        {/* Inspect Code Button */}
                                        {p.has_completed && p.current_code && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setInspectedParticipant(p)}
                                                className="hidden sm:flex text-muted-foreground hover:text-primary"
                                                title="Inspect Code"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        )}

                                        <div className="text-right hidden sm:block">
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Time</div>
                                            <div className="font-mono font-medium flex items-center gap-1 justify-end">
                                                <Clock className="h-3 w-3 text-muted-foreground" />
                                                {p.has_completed ? duration : '--:--'}
                                            </div>
                                        </div>

                                        <div className="w-24 flex justify-end shrink-0">
                                            {p.has_completed ? (
                                                <Badge className="bg-green-600 hover:bg-green-700 gap-1">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Solved
                                                </Badge>
                                            ) : (p.status === 'playing' || !p.status) ? (
                                                <Badge variant="secondary" className="gap-1 animate-pulse">
                                                    <Clock className="h-3 w-3" />
                                                    Playing
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-muted-foreground gap-1">
                                                    <XCircle className="h-3 w-3" />
                                                    Failed
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center gap-4 py-8 bg-muted/10 rounded-b-xl">
                    <Button variant="outline" size="lg" onClick={() => {
                        const myProfile = participants.find(p => p.user_id === currentUser?.id)
                        if (myProfile && myProfile.username) {
                            router.push(`/u/${myProfile.username}`)
                        } else {
                            router.push('/')
                        }
                    }}>
                        <Home className="mr-2 h-4 w-4" />
                        Back Home
                    </Button>
                </CardFooter>
            </Card>

            {/* Code Inspect Dialog */}
            <Dialog open={!!inspectedParticipant} onOpenChange={(open) => !open && setInspectedParticipant(null)}>
                <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b">
                        <DialogTitle className="flex items-center gap-2">
                            <Code className="h-5 w-5 text-primary" />
                            {inspectedParticipant?.username ? `${inspectedParticipant.username}'s Solution` : "Solution"}
                        </DialogTitle>
                        <DialogDescription>
                            Review the code submitted by this player.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-0 bg-zinc-950">
                        {inspectedParticipant && (
                            <CodeBlock
                                value="javascript" // or python based on room.language, defaulting to js for now
                                defaultValue="javascript"
                                className="border-0 rounded-none bg-zinc-950"
                                data={[{ language: "javascript", code: inspectedParticipant.current_code || "// No code available" }, { language: "python", code: inspectedParticipant.current_code || "# No code available" }]}
                            >
                                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-zinc-900 px-4 py-2">
                                    <span className="text-xs text-muted-foreground font-mono">
                                        {room?.language || 'javascript'}
                                    </span>
                                    <CodeBlockCopyButton className="text-white hover:text-white hover:bg-white/10" />
                                </div>
                                <CodeBlockBody>
                                    <CodeBlockItem value={room?.language || 'javascript'}>
                                        <CodeBlockContent language={room?.language || 'javascript'}>
                                            {inspectedParticipant.current_code || (room?.language === 'python' ? "# No code available" : "// No code available")}
                                        </CodeBlockContent>
                                    </CodeBlockItem>
                                </CodeBlockBody>
                            </CodeBlock>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

