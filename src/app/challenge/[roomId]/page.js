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

export default function ArenaPage({ params }) {
    const router = useRouter()

    // State
    const [roomId, setRoomId] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [room, setRoom] = React.useState(null)
    const [challenge, setChallenge] = React.useState(null)
    const [code, setCode] = React.useState("")
    const [output, setOutput] = React.useState([])
    const [isRunning, setIsRunning] = React.useState(false)

    // Unwrap params
    React.useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params
            setRoomId(resolvedParams.roomId)
        }
        unwrapParams()
    }, [params])

    // Fetch Data
    React.useEffect(() => {
        if (!roomId) return

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/challenge/${roomId}`)
                const data = await res.json()

                if (data.error) throw new Error(data.error)

                setRoom(data.room)
                setChallenge(data.challenge)

                // Set starter code if first load
                if (data.challenge?.starterCode) {
                    setCode(data.challenge.starterCode)
                }

            } catch (err) {
                console.error(err)
                alert("Failed to load challenge: " + err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [roomId])

    const handleRunTests = async () => {
        if (!challenge || !room) return

        setIsRunning(true)
        setOutput(prev => [...prev, { type: 'info', content: 'Running tests...' }])

        try {
            // Extract function name from signature
            let functionName = ""

            if (room.language === 'javascript') {
                const match = challenge.functionSignature.match(/function\s+(\w+)/)
                if (match) functionName = match[1]
            } else if (room.language === 'python') {
                const match = challenge.functionSignature.match(/def\s+(\w+)/)
                if (match) functionName = match[1]
            }

            if (!functionName) {
                throw new Error("Could not determine function name from signature.")
            }

            const { results, logs } = await executeCode(room.language, code, challenge.testCases, functionName)

            // Update Console
            const newLogs = logs
            results.forEach((res, i) => {
                const icon = res.passed ? '✅' : '❌'
                if (res.passed) {
                    newLogs.push({ type: 'success', content: `${icon} Test ${i + 1} Passed` })
                } else {
                    newLogs.push({
                        type: 'error',
                        content: `${icon} Test ${i + 1} Failed: Expected ${JSON.stringify(res.expected)}, Got ${JSON.stringify(res.actual)}`
                    })
                }
            })

            setOutput(prev => [...prev, ...newLogs])

        } catch (err) {
            setOutput(prev => [...prev, { type: 'error', content: err.message }])
        } finally {
            setIsRunning(false)
        }
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
                        <span>00:00</span>
                    </div>
                    <Button onClick={handleRunTests} disabled={isRunning} variant="secondary">
                        {isRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4 fill-current" />}
                        Run
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="mr-2 h-4 w-4" />
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
                                    {challenge.testCases?.map((test, i) => (
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
