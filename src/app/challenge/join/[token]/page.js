"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import Loader from "@/components/ui/loader"

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
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()

                if (!user) {
                    setStatus("Redirecting to login...")
                    const next = encodeURIComponent(window.location.pathname)
                    router.push(`/login?next=${next}`)
                    return
                }

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
        <div className="h-screen w-full relative bg-background">
            <Loader />
            <div className="absolute top-[60%] w-full text-center">
                <p className="text-muted-foreground text-lg animate-pulse">{status}</p>
            </div>
        </div>
    )
}
