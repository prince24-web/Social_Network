"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function JoinChallengePage({ params }) {
    const router = useRouter()
    const [status, setStatus] = React.useState("Checking invite...")
    const [token, setToken] = React.useState(null)

    // Unwrap params
    React.useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params
            setToken(resolvedParams.token)
        }
        unwrapParams()
    }, [params])

    React.useEffect(() => {
        if (!token) return

        const joinRoom = async () => {
            try {
                const res = await fetch("/api/challenge/join", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ inviteToken: token })
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.error || "Failed to join room")
                }

                // Success
                setStatus("Joined! Redirecting to lobby...")
                router.replace(`/challenge/lobby/${data.roomId}`)

            } catch (error) {
                console.error(error)
                setStatus(`Error: ${error.message}`)
            }
        }

        joinRoom()
    }, [token, router])

    return (
        <div className="flex h-screen flex-col items-center justify-center p-6 bg-background space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground text-lg animate-pulse">{status}</p>
        </div>
    )
}
