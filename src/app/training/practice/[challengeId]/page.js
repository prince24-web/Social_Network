
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import Editor from "@monaco-editor/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Loader2, Play, CheckCircle, Terminal, ChevronLeft, ArrowRight, Trophy, Maximize2, Minimize2 } from "lucide-react"
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
    const [isMobile, setIsMobile] = React.useState(false)
    const [isEditorFullscreen, setIsEditorFullscreen] = React.useState(false)

    // Unwrap params
    React.useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params
            setChallengeId(resolvedParams.challengeId)
        }
        unwrapParams()

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
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

            allPassed = results.length > 0 && results.every(r => r.passed)

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
                <div className="flex items-center gap-2 sm:gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/training")} className="h-8 w-8">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex flex-col min-w-0">
                        <h1 className="font-bold text-xs sm:text-base truncate max-w-[120px] sm:max-w-[200px]">{challenge.title}</h1>
                        <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 border-primary/20">{challenge.language}</Badge>
                            <span className="capitalize hidden sm:inline">{challenge.difficulty}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <Button onClick={() => handleRunTests(false)} disabled={isRunning} variant="secondary" size={isMobile ? "sm" : "default"}>
                        {isRunning ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <Play className="h-4 w-4 fill-current sm:mr-2" />}
                        <span className="hidden sm:inline">Run</span>
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isRunning || isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        size={isMobile ? "sm" : "default"}
                    >
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 sm:mr-2" />}
                        <span className="hidden sm:inline">Submit</span>
                    </Button>
                </div>
            </header>


            {/* Main Split Layout */}
            <div className="flex-1 overflow-hidden relative">
                <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>

                    {/* Left Panel: Instructions */}
                    <Panel defaultSize={isMobile ? 30 : 40} minSize={20}>
                        <ScrollArea className="h-full">
                            <div className="p-4 sm:p-6 prose prose-invert max-w-none">
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

                    <PanelResizeHandle className={isMobile ? "h-1 bg-border hover:bg-primary/50 transition-colors cursor-row-resize" : "w-1 bg-border hover:bg-primary/50 transition-colors cursor-col-resize"} />

                    {/* Right Panel: Editor & Output */}
                    <Panel defaultSize={isMobile ? 70 : 60} minSize={30}>
                        <PanelGroup direction="vertical">

                            {/* Editor */}
                            <Panel defaultSize={70} minSize={20} className={isEditorFullscreen ? "fixed inset-0 z-50 bg-background flex flex-col" : "relative flex flex-col"}>
                                {/* Editor Toolbar */}
                                <div className="flex items-center justify-between px-4 py-1 bg-muted/30 border-b">
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Editor</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => setIsEditorFullscreen(!isEditorFullscreen)}
                                    >
                                        {isEditorFullscreen ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
                                    </Button>
                                </div>
                                <div className="flex-1 min-h-0">
                                    <Editor
                                        height="100%"
                                        defaultLanguage={
                                            challenge.language === "python" ? "python" :
                                                challenge.language === "cpp" ? "cpp" : "javascript"
                                        }
                                        theme="vs-dark"
                                        value={code}
                                        onChange={(value) => setCode(value)}
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: isMobile ? 12 : 14,
                                            scrollBeyondLastLine: false,
                                            automaticLayout: true,
                                            padding: { top: 16 }
                                        }}
                                    />
                                </div>
                                {isEditorFullscreen && (
                                    <div className="p-2 border-t flex justify-end gap-2 bg-muted/10">
                                        <Button size="sm" variant="secondary" onClick={() => handleRunTests(false)} disabled={isRunning}>
                                            <Play className="h-3 w-3 mr-1" /> Run
                                        </Button>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleSubmit} disabled={isRunning || isSubmitting}>
                                            <CheckCircle className="h-3 w-3 mr-1" /> Submit
                                        </Button>
                                    </div>
                                )}
                            </Panel>

                            {!isEditorFullscreen && <PanelResizeHandle className="h-1 bg-border hover:bg-primary/50 transition-colors cursor-row-resize" />}

                            {/* Output/Console */}
                            {!isEditorFullscreen && (
                                <Panel defaultSize={30} minSize={10} className="bg-muted/10 flex flex-col">
                                    <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/20 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        <Terminal className="h-4 w-4" />
                                        Console Output
                                    </div>
                                    <ScrollArea className="flex-1 font-mono text-sm p-4 text-xs sm:text-sm">
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
                            )}

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
