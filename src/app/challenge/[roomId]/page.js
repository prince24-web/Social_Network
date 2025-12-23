"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import Editor from "@monaco-editor/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Loader2, Play, CheckCircle, Terminal, Clock, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Loader from "@/components/ui/loader"
import { executeCode } from "@/utils/code-execution"
import { createClient } from "@/utils/supabase/client"

export default function ArenaPage({ params }) {
    const router = useRouter()
    const supabase = createClient()

    // State
    const [roomId, setRoomId] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [room, setRoom] = React.useState(null)
    const [challenge, setChallenge] = React.useState(null)
    const [code, setCode] = React.useState("")
    const [output, setOutput] = React.useState([])
    const [isRunning, setIsRunning] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [startTime, setStartTime] = React.useState(null)
    const [elapsedTime, setElapsedTime] = React.useState("00:00")
    const [isCompleted, setIsCompleted] = React.useState(false)
    const [participants, setParticipants] = React.useState([])

    // Unwrap params
    React.useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params
            setRoomId(resolvedParams.roomId)
        }
        unwrapParams()
    }, [params])

    // Fetch Data
    const fetchData = React.useCallback(async () => {
        if (!roomId) return

        try {
            const res = await fetch(`/api/challenge/${roomId}`)
            const data = await res.json()

            if (data.error) throw new Error(data.error)

            setRoom(data.room)
            setChallenge(data.challenge)
            setStartTime(new Date(data.room.started_at).getTime())

            // Initial participants fetch
            const { data: parts } = await supabase
                .from("participants")
                .select("*, auth.users(username, avatar_url)")
                .eq("challenge_room_id", roomId)

            if (parts) {
                // Map auth.users to simple fields if needed, or just use as is
                // Note: Supabase join might return array or object depending on relation one-to-one
                // Let's assume standard join structure
                setParticipants(parts)

                // Check if current user completed
                const { data: { user } } = await supabase.auth.getUser()
                const myPart = parts.find(p => p.user_id === user?.id)
                if (myPart?.status === 'completed') {
                    setIsCompleted(true)
                }
            }


            // Set starter code if first load (and not already typed? - simplifying for now)
            if (data.challenge?.starter_code && !code) {
                setCode(data.challenge.starter_code)
            }

        } catch (err) {
            console.error(err)
            // alert("Failed to load challenge: " + err.message)
        } finally {
            setLoading(false)
        }
    }, [roomId, supabase, code])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    // Timer Effect
    React.useEffect(() => {
        if (!startTime || isCompleted) return

        const interval = setInterval(() => {
            const now = Date.now()
            const diff = Math.floor((now - startTime) / 1000)
            const mins = Math.floor(diff / 60).toString().padStart(2, '0')
            const secs = (diff % 60).toString().padStart(2, '0')
            setElapsedTime(`${mins}:${secs}`)
        }, 1000)

        return () => clearInterval(interval)
    }, [startTime, isCompleted])

    // Realtime Subscription
    React.useEffect(() => {
        if (!roomId) return

        const channel = supabase
            .channel(`arena:${roomId}`)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'participants', filter: `challenge_room_id=eq.${roomId}` }, (payload) => {
                // Refresh participants list to show progress updates
                fetchData()
                // Or manually update the list if we want to be more efficient, but fetchData is safer
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [roomId, supabase, fetchData])


    const handleRunTests = async (isSubmission = false) => {
        if (!challenge || !room) return false

        setIsRunning(true)
        if (!isSubmission) setOutput(prev => [...prev, { type: 'info', content: 'Running tests...' }])
        else setOutput(prev => [...prev, { type: 'info', content: 'Submitting solution...' }])

        let allPassed = false
        let finalLogs = []

        try {
            // Extract function name
            let functionName = ""
            if (room.language === 'javascript') {
                const sig = challenge.function_signature || challenge.functionSignature || ""
                const match = sig.match(/function\s+(\w+)/)
                if (match) functionName = match[1]
            } else if (room.language === 'python') {
                const sig = challenge.function_signature || challenge.functionSignature || ""
                const match = sig.match(/def\s+(\w+)/)
                if (match) functionName = match[1]
            }

            if (!functionName) throw new Error("Could not determine function name.")

            // Execute
            const tests = challenge.test_cases || challenge.testCases || []
            const { results, logs } = await executeCode(room.language, code, tests, functionName)

            finalLogs = logs || []

            // Update Console
            results.forEach((res, i) => {
                const icon = res.passed ? '✅' : '❌'
                if (res.passed) {
                    finalLogs.push({ type: 'success', content: `${icon} Test ${i + 1} Passed` })
                } else {
                    finalLogs.push({
                        type: 'error',
                        content: `${icon} Test ${i + 1} Failed: Expected ${JSON.stringify(res.expected)}, Got ${JSON.stringify(res.actual)}`
                    })
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

        if (passed) {
            try {
                const res = await fetch("/api/challenge/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ roomId, passed: true, code })
                })

                if (!res.ok) {
                    const data = await res.json()
                    throw new Error(data.error || "Submission failed")
                }

                setIsCompleted(true)
                setOutput(prev => [...prev, { type: 'success', content: '🎉 Challenge Completed! Redirecting to rankings...' }])

                // Redirect to ranking
                setTimeout(() => {
                    router.push(`/challenge/${roomId}/ranking`)
                }, 1500)
            } catch (err) {
                console.error(err)
                setOutput(prev => [...prev, { type: 'error', content: `Failed to save submission: ${err.message}` }])
                // Do NOT set isCompleted true if it failed to save
            }
        }
        setIsSubmitting(false)
    }

    if (loading) return <div className="h-screen w-full relative bg-background"><Loader /></div>

    if (!room || !challenge) return (
        <div className="flex h-screen items-center justify-center flex-col gap-4">
            <p className="text-xl font-semibold text-destructive">Challenge not found or Room error.</p>
            <Button variant="outline" onClick={() => router.push("/")}>Go Home</Button>
        </div>
    )

    return (
        <div className="h-screen w-full flex flex-col bg-background text-foreground overflow-hidden">
            {/* Top Bar */}
            <header className="h-14 border-b flex items-center justify-between px-4 bg-muted/20 shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-sm sm:text-base truncate max-w-[200px]">{challenge.title}</h1>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/20">{room.language}</Badge>
                            <span className="capitalize">{room.difficulty}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-mono text-lg font-bold bg-muted px-3 py-1 rounded border">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{elapsedTime}</span>
                    </div>
                    {/* Live Participants Avatars could go here */}

                    <Button onClick={() => handleRunTests(false)} disabled={isRunning || isCompleted} variant="secondary">
                        {isRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4 fill-current" />}
                        Run
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isRunning || isSubmitting || isCompleted}
                        className={isCompleted ? "bg-green-600" : "bg-green-600 hover:bg-green-700 text-white"}
                    >
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                        {isCompleted ? "Completed" : "Submit"}
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
                                    {(challenge.test_cases || challenge.testCases)?.map((test, i) => (
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
                                    defaultLanguage={room.language === "python" ? "python" : "javascript"}
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
        </div>
    )
}
