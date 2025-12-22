
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
        const { roomId, passed, code } = body

        if (!roomId) {
            return NextResponse.json({ error: "Room ID is required." }, { status: 400 })
        }

        // Update Participant
        const now = new Date().toISOString()
        const updateData = {
            has_completed: passed, // Assuming boolean
            last_submitted_at: now,
            current_code: code // Optional: save their code
        }

        if (passed) {
            updateData.completed_at = now
            updateData.status = 'completed' // or equivalent enum
        }

        const { error: updateError } = await supabase
            .from("participants")
            .update(updateData)
            .eq("challenge_room_id", roomId)
            .eq("user_id", user.id)

        if (updateError) {
            console.error("Submit error:", updateError)
            return NextResponse.json({ error: "Failed to submit." }, { status: 500 })
        }

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error("Unexpected error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
