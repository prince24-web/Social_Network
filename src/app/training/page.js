
"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Loader2, PlayCircle, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function TrainingPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [stats, setStats] = useState({
        javascript: { solved: 0, total: 0, nextDifficulty: 'easy', loading: true },
        python: { solved: 0, total: 0, nextDifficulty: 'easy', loading: true },
        cpp: { solved: 0, total: 0, nextDifficulty: 'easy', loading: true }
    })

    useEffect(() => {
        const fetchStats = async (lang) => {
            try {
                const res = await fetch(`/api/training/progress?language=${lang}`)
                const data = await res.json()
                if (data.error) throw new Error(data.error)

                setStats(prev => ({
                    ...prev,
                    [lang]: {
                        solved: data.solvedCount || 0,
                        total: data.totalCount || 0,
                        nextDifficulty: data.nextDifficulty, // 'easy', 'medium', 'hard', or 'completed'
                        loading: false
                    }
                }))
            } catch (err) {
                console.error(`Error fetching ${lang} stats:`, err)
            }
        }

        fetchStats('javascript')
        fetchStats('python')
        fetchStats('cpp')
    }, [])

    const handleContinue = async (language) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/training/start?language=${language}`)
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to start training")
            }

            if (data.completed) {
                alert("You have completed all challenges for this language! Check back later for more.")
                setLoading(false)
                return
            }

            // Redirect to practice arena
            router.push(`/training/practice/${data.challengeId}`)

        } catch (error) {
            console.error(error)
            alert(error.message)
            setLoading(false)
        }
    }

    const PathwayCard = ({ language, title, logo, colorClass }) => {
        const stat = stats[language]
        const progress = stat.total > 0 ? (stat.solved / stat.total) * 100 : 0
        const isCompleted = stat.nextDifficulty === 'completed'

        return (
            <Card className="border-2 hover:border-primary/50 transition-all cursor-pointer group bg-muted/50" onClick={() => !loading && handleContinue(language)}>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-background border ${colorClass} group-hover:scale-110 transition-transform flex items-center justify-center w-14 h-14 shadow-lg shadow-black/20`}>
                            <img src={logo} alt={title} className="w-8 h-8 object-contain" />
                        </div>
                        {isCompleted && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    </div>
                    <CardTitle className="mt-4 text-xl">{title}</CardTitle>
                    <CardDescription>
                        Master {title} through progressive challenges.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-muted-foreground">Progress</span>
                            <span>{stat.loading ? "..." : `${stat.solved}/${stat.total}`}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Next:</span>
                        {stat.loading ? (
                            <span className="animate-pulse bg-muted h-4 w-12 rounded"></span>
                        ) : isCompleted ? (
                            <span className="font-bold text-green-500">Completed!</span>
                        ) : (
                            <span className={`font-bold uppercase ${stat.nextDifficulty === 'easy' ? 'text-green-500' :
                                stat.nextDifficulty === 'medium' ? 'text-yellow-500' :
                                    'text-red-500'
                                }`}>{stat.nextDifficulty}</span>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full group-hover:bg-primary/90"
                        disabled={loading || stat.loading}
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> :
                            isCompleted ? "Review" : "Continue Training"}
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-background p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Skill Pathways</h1>
                    <p className="text-muted-foreground">Select a language to continue your journey.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PathwayCard
                        language="javascript"
                        title="JavaScript"
                        logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                        colorClass="border-yellow-500/20 group-hover:border-yellow-500/50"
                    />
                    <PathwayCard
                        language="python"
                        title="Python"
                        logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                        colorClass="border-blue-500/20 group-hover:border-blue-500/50"
                    />
                    <PathwayCard
                        language="cpp"
                        title="C++"
                        logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
                        colorClass="border-blue-600/20 group-hover:border-blue-600/50"
                    />
                </div>
            </div>
        </div>
    )
}
