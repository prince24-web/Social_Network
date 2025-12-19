
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const supabase = await createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { inviteToken } = body

        if (!inviteToken) {
            return NextResponse.json({ error: "Invite token is required." }, { status: 400 })
        }

        // Call Security Definer Function
        const { data, error } = await supabase.rpc('join_challenge_room', {
            _invite_token: inviteToken
        })

        if (error) {
            console.error("RPC Error:", error)
            return NextResponse.json({ error: "Failed to join room." }, { status: 500 })
        }

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            roomId: data.roomId
        })

    } catch (error) {
        console.error("Unexpected error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
