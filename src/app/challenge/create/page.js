"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function CreateChallengePage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = React.useState(false)
    const [language, setLanguage] = React.useState("javascript")
    const [difficulty, setDifficulty] = React.useState("medium")
    const [maxPlayers, setMaxPlayers] = React.useState("2")

    const handleCreate = async () => {
        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push("/login") // Or rely on middleware
                return
            }

            const res = await fetch("/api/challenge/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language,
                    difficulty,
                    maxPlayers: parseInt(maxPlayers)
                })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to create room")
            }

            router.push(`/challenge/lobby/${data.roomId}`)

        } catch (error) {
            console.error(error)
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-muted/30">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <CardTitle>Create Challenge</CardTitle>
                    </div>
                    <CardDescription>
                        Set up a private room to compete with friends.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">

                    <div className="grid gap-2">
                        <Label>Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Difficulty</Label>
                        <Select value={difficulty} onValueChange={setDifficulty}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Max Players</Label>
                        <Select value={maxPlayers} onValueChange={setMaxPlayers}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2">2 Players (1v1)</SelectItem>
                                <SelectItem value="3">3 Players</SelectItem>
                                <SelectItem value="4">4 Players</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={handleCreate} disabled={loading} className="w-full">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Room
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
