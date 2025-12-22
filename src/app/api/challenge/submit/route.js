
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

        // Check if all participants completed
        const { count: totalParticipants } = await supabase
            .from("participants")
            .select("*", { count: 'exact', head: true })
            .eq("challenge_room_id", roomId)

        const { count: completedParticipants } = await supabase
            .from("participants")
            .select("*", { count: 'exact', head: true })
            .eq("challenge_room_id", roomId)
            .eq("has_completed", true) // Assuming has_completed is the flag, or check status='completed'

        // If simple check:
        // Or fetch all and check in JS if logic is complex
        
        // Let's assume strict "everyone finished" rule for now
        // But users might leave. So we might need a better trigger.
        // For now, if "completed" count matches "total", mark room done.
        
        // Only if everyone finished do we close the room? 
        // Or maybe we don't need to close it, just let frontend redirect.
        // But updating status to 'completed' helps late joiners know it's over.
        
        if (totalParticipants && completedParticipants && totalParticipants === completedParticipants) {
             await supabase
                .from("challenge_rooms")
                .update({ status: "completed", ended_at: new Date().toISOString() })
                .eq("id", roomId)
        }

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error("Unexpected error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
