
"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Zap, Swords, Brain } from "lucide-react"

export default function TrainingPage() {
    const router = useRouter()
    const [language, setLanguage] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [loading, setLoading] = useState(false)

    const handleStart = async () => {
        if (!language || !difficulty) return

        setLoading(true)
        try {
            const res = await fetch(`/api/training/start?language=${language}&difficulty=${difficulty}`)
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to start training")
            }

            // Redirect to practice arena
            router.push(`/training/practice/${data.challengeId}`)

        } catch (error) {
            console.error(error)
            alert(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-md border-2 shadow-xl">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                        <Brain className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Solo Training</CardTitle>
                    <CardDescription>
                        Practice coding problems at your own pace.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select Language</label>
                        <Select onValueChange={setLanguage} value={language}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select Difficulty</label>
                        <Select onValueChange={setDifficulty} value={difficulty}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy (1 Point)</SelectItem>
                                <SelectItem value="medium">Medium (2 Points)</SelectItem>
                                <SelectItem value="hard">Hard (3 Points)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full h-12 text-lg"
                        onClick={handleStart}
                        disabled={!language || !difficulty || loading}
                    >
                        {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        {loading ? "Preparing Arena..." : "Start Training"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
