
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import Editor from "@monaco-editor/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Loader2, Play, CheckCircle, Terminal, ChevronLeft, ArrowRight, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Loader from "@/components/ui/loader"
import { executeCode } from "@/utils/code-execution"
import { createClient } from "@/utils/supabase/client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

export default function PracticeArenaPage({ params }) {
    const router = useRouter()
    const supabase = React.useMemo(() => createClient(), [])

    // State
    const [challengeId, setChallengeId] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [challenge, setChallenge] = React.useState(null)
    const [code, setCode] = React.useState("")
    const [output, setOutput] = React.useState([])
    const [isRunning, setIsRunning] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // Timer State (Hidden)
    const [startTime, setStartTime] = React.useState(null)
    const [finalTimeStr, setFinalTimeStr] = React.useState("")
    const [pointsEarned, setPointsEarned] = React.useState(0)

    // Completion Modal
    const [showSuccessModal, setShowSuccessModal] = React.useState(false)

    // Unwrap params
    React.useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params
            setChallengeId(resolvedParams.challengeId)
        }
        unwrapParams()
    }, [params])

    // Fetch Data
    const fetchData = React.useCallback(async () => {
        if (!challengeId) return

        try {
            const { data, error } = await supabase
                .from("challenges")
                .select("*")
                .eq("id", challengeId)
                .single()

            if (error) throw error

            setChallenge(data)
            setCode(data.starter_code || "")
            setStartTime(Date.now()) // Start timer locally

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [challengeId, supabase])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])


    const handleRunTests = async (isSubmission = false) => {
        if (!challenge) return false

        setIsRunning(true)
        if (!isSubmission) setOutput(prev => [...prev, { type: 'info', content: 'Running tests...' }])
        else setOutput(prev => [...prev, { type: 'info', content: 'Submitting solution...' }])

        let allPassed = false
        let finalLogs = []

        try {
            // Extract function name
            let functionName = ""
            if (challenge.language === 'javascript') {
                const sig = challenge.function_signature || ""
                const match = sig.match(/function\s+(\w+)/)
                if (match) functionName = match[1]
            } else if (challenge.language === 'python') {
                const sig = challenge.function_signature || ""
                const match = sig.match(/def\s+(\w+)/)
                if (match) functionName = match[1]
            }

            if (!functionName) throw new Error("Could not determine function name.")

            // Execute
            const tests = challenge.test_cases || []
            const { results, logs } = await executeCode(challenge.language, code, tests, functionName)

            finalLogs = logs || []

            // Update Console
            results.forEach((res, i) => {
                const isHidden = tests[i]?.hidden
                const icon = res.passed ? '✅' : '❌'
                if (res.passed) {
                    finalLogs.push({
                        type: 'success',
                        content: `${icon} Test ${i + 1} Passed ${isHidden ? '(Hidden)' : ''}`
                    })
                } else {
                    if (isHidden) {
                        finalLogs.push({
                            type: 'error',
                            content: `${icon} Test ${i + 1} Failed (Hidden Test)`
                        })
                    } else {
                        finalLogs.push({
                            type: 'error',
                            content: `${icon} Test ${i + 1} Failed: Expected ${JSON.stringify(res.expected)}, Got ${JSON.stringify(res.actual)}`
                        })
                    }
                }
            })

            allPassed = results.every(r => r.passed)

            if (isSubmission && allPassed) {
                finalLogs.push({ type: 'success', content: '🏆 All Tests Passed! Submitting...' })
            } else if (isSubmission) {
                finalLogs.push({ type: 'error', content: '❌ Some tests failed. Cannot submit.' })
            }

            setOutput(prev => [...prev, ...finalLogs])

        } catch (err) {
            setOutput(prev => [...prev, { type: 'error', content: err.message }])
        } finally {
            setIsRunning(false)
        }

        return allPassed
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        const passed = await handleRunTests(true)
        const endTime = Date.now()
        const durationSeconds = Math.floor((endTime - startTime) / 1000)

        // Calculate display time
        const mins = Math.floor(durationSeconds / 60).toString().padStart(2, '0')
        const secs = (durationSeconds % 60).toString().padStart(2, '0')
        const timeStr = `${mins}:${secs}`

        if (passed) {
            try {
                const res = await fetch("/api/training/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        challengeId,
                        passed: true,
                        code,
                        duration: durationSeconds
                    })
                })

                if (!res.ok) {
                    const data = await res.json()
                    throw new Error(data.error || "Submission failed")
                }

                const data = await res.json()

                setFinalTimeStr(timeStr)
                setPointsEarned(data.pointsEarned || 0)
                setShowSuccessModal(true)
                setOutput(prev => [...prev, { type: 'success', content: '🎉 Training Complete! Points awarded.' }])

            } catch (err) {
                console.error(err)
                setOutput(prev => [...prev, { type: 'error', content: `Failed to save submission: ${err.message}` }])
            }
        }
        setIsSubmitting(false)
    }

    if (loading) return <div className="h-screen w-full relative bg-background"><Loader /></div>

    if (!challenge) return (
        <div className="flex h-screen items-center justify-center flex-col gap-4">
            <p className="text-xl font-semibold text-destructive">Challenge not found.</p>
            <Button variant="outline" onClick={() => router.push("/training")}>Back to Selection</Button>
        </div>
    )

    return (
        <div className="h-[calc(100vh-3.5rem)] w-full flex flex-col bg-background text-foreground overflow-hidden">
            {/* Top Bar */}
            <header className="h-14 border-b flex items-center justify-between px-4 bg-muted/20 shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/training")}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-sm sm:text-base truncate max-w-[200px]">{challenge.title}</h1>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/20">{challenge.language}</Badge>
                            <span className="capitalize">{challenge.difficulty}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Timer is hidden as requested */}
                    <Button onClick={() => handleRunTests(false)} disabled={isRunning} variant="secondary">
                        {isRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4 fill-current" />}
                        Run
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isRunning || isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                        Submit
                    </Button>
                </div>
            </header>


            {/* Main Split Layout */}
            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal">

                    {/* Left Panel: Instructions */}
                    <Panel defaultSize={40} minSize={20}>
                        <ScrollArea className="h-full">
                            <div className="p-6 prose prose-invert max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {challenge.description || "No description provided."}
                                </ReactMarkdown>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-2">Examples</h3>
                                    {(challenge.test_cases)
                                        ?.filter(test => !test.hidden)
                                        .slice(0, 2)
                                        .map((test, i) => (
                                            <div key={i} className="mb-4 bg-muted/50 p-3 rounded-lg border text-sm font-mono">
                                                <div><span className="text-muted-foreground">Input:</span> {JSON.stringify(test.input)}</div>
                                                <div className="mt-1"><span className="text-muted-foreground">Output:</span> {JSON.stringify(test.output)}</div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </ScrollArea>
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50 transition-colors cursor-col-resize" />

                    {/* Right Panel: Editor & Output */}
                    <Panel defaultSize={60} minSize={30}>
                        <PanelGroup direction="vertical">

                            {/* Editor */}
                            <Panel defaultSize={70} minSize={20}>
                                <Editor
                                    height="100%"
                                    defaultLanguage={challenge.language === "python" ? "python" : "javascript"}
                                    theme="vs-dark"
                                    value={code}
                                    onChange={(value) => setCode(value)}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                        padding: { top: 16 }
                                    }}
                                />
                            </Panel>

                            <PanelResizeHandle className="h-1 bg-border hover:bg-primary/50 transition-colors cursor-row-resize" />

                            {/* Output/Console */}
                            <Panel defaultSize={30} minSize={10} className="bg-muted/10 flex flex-col">
                                <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/20 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    <Terminal className="h-4 w-4" />
                                    Console Output
                                </div>
                                <ScrollArea className="flex-1 font-mono text-sm p-4">
                                    {output.length === 0 ? (
                                        <div className="text-muted-foreground italic">Click 'Run' to see output...</div>
                                    ) : (
                                        <div className="flex flex-col gap-1">
                                            {output.map((log, i) => (
                                                <div key={i} className={
                                                    log.type === 'error' ? 'text-red-400' :
                                                        log.type === 'success' ? 'text-green-400' :
                                                            'text-foreground'
                                                }>
                                                    {log.content}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ScrollArea>
                            </Panel>

                        </PanelGroup>
                    </Panel>

                </PanelGroup>
            </div>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl text-green-500">
                            <CheckCircle className="w-6 h-6" />
                            Challenge Completed!
                        </DialogTitle>
                        <DialogDescription>
                            Great job! Here are your stats for this session.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Time Taken</span>
                            <span className="text-2xl font-mono font-bold mt-1">{finalTimeStr}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg border border-yellow-500/20">
                            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Points Earned</span>
                            <div className="flex items-center gap-1 mt-1 text-yellow-500">
                                <Trophy className="w-5 h-5 fill-current" />
                                <span className="text-2xl font-bold">{pointsEarned}</span>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-between gap-4">
                        <Button variant="secondary" onClick={() => router.push("/leaderboard")} className="w-full sm:w-auto">
                            <Trophy className="w-4 h-4 mr-2" />
                            Check Leaderboard
                        </Button>
                        <Button onClick={() => router.push("/training")} className="w-full sm:w-auto">
                            Next Challenge
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}
