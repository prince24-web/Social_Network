"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trophy, Clock, XCircle, CheckCircle, Home, RotateCcw } from "lucide-react"
import Loader from "@/components/ui/loader"

export default function RankingPage({ params }) {
    const router = useRouter()
    const supabase = React.useMemo(() => createClient(), [])

    const [roomId, setRoomId] = React.useState(null)
    const [room, setRoom] = React.useState(null)
    const [participants, setParticipants] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [currentUser, setCurrentUser] = React.useState(null)

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

        return () => {
            supabase.removeChannel(channel)
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
            <Card className="w-full max-w-3xl shadow-xl border-none ring-1 ring-white/10">
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
                                    <div className="w-12 text-center font-bold text-xl text-muted-foreground">
                                        #{index + 1}
                                    </div>

                                    <div
                                        className="flex items-center gap-3 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => {
                                            if (p.username) router.push(`/u/${p.username}`)
                                        }}
                                    >
                                        <div className="h-10 w-10 rounded-full bg-muted overflow-hidden border">
                                            <img
                                                src={p.avatar_url || `https://ui-avatars.com/api/?name=${p.username || 'User'}&background=random`}
                                                alt={p.username}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold flex items-center gap-2">
                                                {p.display_name || p.username || 'Unknown'}
                                                {isMe && <Badge variant="secondary" className="text-[10px]">YOU</Badge>}
                                            </span>
                                            <span className="text-xs text-muted-foreground capitalize">
                                                {p.status || 'playing'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Time</div>
                                            <div className="font-mono font-medium flex items-center gap-1">
                                                <Clock className="h-3 w-3 text-muted-foreground" />
                                                {p.has_completed ? duration : '--:--'}
                                            </div>
                                        </div>

                                        <div className="w-24 flex justify-end">
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
                        // Find current user profile from participants list to get username
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
                    {/* Add Play Again or similar later */}
                </CardFooter>
            </Card>
        </div>
    )
}

