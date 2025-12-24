"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Loader2, Copy, Check, Users, Play, AlertCircle } from "lucide-react"
import Loader from "@/components/ui/loader"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function LobbyPage({ params }) {
    const router = useRouter()
    const supabase = React.useMemo(() => createClient(), [])

    // State
    const [roomId, setRoomId] = React.useState(null)
    const [room, setRoom] = React.useState(null)
    const [participants, setParticipants] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const [copied, setCopied] = React.useState(false)
    const [userId, setUserId] = React.useState(null)
    const [starting, setStarting] = React.useState(false)

    // URL to join
    const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/challenge/join/${room?.invite_token}` : ""

    // Unwrap params
    React.useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params
            setRoomId(resolvedParams.roomId)
        }
        unwrapParams()
    }, [params])

    // Monitor Room Status for Redirect
    React.useEffect(() => {
        if (room?.status === 'active' && roomId) {
            router.push(`/challenge/${roomId}`)
        }
    }, [room, roomId, router])

    // Initial Fetch
    React.useEffect(() => {
        if (!roomId) return

        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                setUserId(user?.id)

                // Fetch Room
                const { data: roomData, error: roomError } = await supabase
                    .from("challenge_rooms")
                    .select("*")
                    .eq("id", roomId)
                    .single()

                if (roomError) throw roomError
                setRoom(roomData)


                // Better approach: fetch participants, then fetch profiles for those user_ids.
                const { data: parts, error: partsError } = await supabase
                    .from("participants")
                    .select("user_id, language")
                    .eq("challenge_room_id", roomId)

                if (partsError) throw partsError

                const userIds = parts.map(p => p.user_id)
                const { data: profiles, error: profError } = await supabase
                    .from("profiles")
                    .select("id, username, avatar_url, display_name")
                    .in("id", userIds)

                if (profError) throw profError

                // Merge
                const mergedParticipants = parts.map(p => {
                    const profile = profiles.find(prof => prof.id === p.user_id)
                    return { ...p, ...profile }
                })
                setParticipants(mergedParticipants)

            } catch (err) {
                console.error(err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        // Subscription for Realtime
        console.log("Subscribing to room:", roomId)
        const channel = supabase
            .channel(`room:${roomId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'participants',
                filter: `challenge_room_id=eq.${roomId}`
            }, (payload) => {
                console.log("Participants change detected:", payload)
                // Refresh data on change
                fetchData()
            })
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'challenge_rooms',
                filter: `id=eq.${roomId}`
            }, (payload) => {
                console.log("Room change detected:", payload)
                setRoom(payload.new)
            })
            .subscribe((status) => {
                console.log(`Subscription status for room:${roomId}:`, status)
            })

        return () => {
            supabase.removeChannel(channel)
        }

    }, [roomId, supabase, router])


    const handleCopy = () => {
        navigator.clipboard.writeText(joinUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleStart = async () => {
        setStarting(true)
        try {
            const res = await fetch("/api/challenge/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomId })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            // Manual redirect for the host (fallback/immediate)
            router.push(`/challenge/${roomId}`)
        } catch (err) {
            alert(err.message)
            setStarting(false)
        }
    }

    if (loading) return <div className="h-screen w-full relative bg-background"><Loader /></div>
    if (error) return <div className="flex h-screen items-center justify-center text-destructive">{error}</div>
    if (!room) return <div className="flex h-screen items-center justify-center">Room not found</div>

    const isCreator = room.created_by === userId
    const isFull = participants.length >= room.max_players
    const canStart = isCreator && participants.length >= 2 // Min 2 players rule

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-2xl shadow-lg border-2">
                <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <Badge variant="outline" className="text-lg px-4 py-1 border-primary/20 bg-primary/5 capitalize">
                            {room.language} • {room.difficulty}
                        </Badge>
                    </div>
                    <CardTitle className="text-3xl">Lobby</CardTitle>
                </CardHeader>

                <CardContent className="space-y-8">

                    {/* Invite Section */}
                    <div className="flex flex-col items-center space-y-3 p-6 bg-card rounded-xl border border-dashed border-primary/30">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Invite Link</p>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <div className="flex-1 bg-muted/50 p-3 rounded-md text-xs sm:text-sm font-mono truncate select-all border">
                                {joinUrl}
                            </div>
                            <Button size="icon" onClick={handleCopy} className={copied ? "bg-green-600 hover:bg-green-700" : ""}>
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground pt-1">Only users with this link can join.</p>
                    </div>

                    <Separator />

                    {/* Participants */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Players
                            </h3>
                            <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
                                {participants.length} / {room.max_players}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {participants.map((p) => (
                                <div key={p.user_id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                                        <img src={p.avatar_url || `https://ui-avatars.com/api/?name=${p.username}&background=random`} alt={p.username} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="font-medium truncate">{p.display_name || p.username}</span>
                                        {p.user_id === room.created_by && (
                                            <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Host</span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Empty Slots */}
                            {Array.from({ length: Math.max(0, room.max_players - participants.length) }).map((_, i) => (
                                <div key={`empty-${i}`} className="flex items-center gap-3 p-3 rounded-lg border border-dashed opacity-50">
                                    <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-muted-foreground/50" />
                                    </div>
                                    <span className="text-sm text-muted-foreground italic">Waiting for player...</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pt-6 bg-muted/10">
                    {!isCreator && (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm animate-pulse">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Waiting for host to start...
                        </div>
                    )}

                    {isCreator && (
                        <div className="w-full space-y-3">
                            <Button
                                className="w-full text-lg py-6"
                                size="lg"
                                onClick={handleStart}
                                disabled={!canStart || starting}
                            >
                                {starting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Play className="mr-2 h-5 w-5 fill-current" />}
                                Start Challenge
                            </Button>
                            {!canStart && (
                                <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                                    <AlertCircle className="h-3 w-3" />
                                    Need at least 2 players to start
                                </div>
                            )}
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
