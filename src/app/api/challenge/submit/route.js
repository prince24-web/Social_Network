
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

const DIFFICULTY_POINTS = {
    'easy': 1,
    'medium': 2,
    'hard': 3
}

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

        // 1. Fetch Room details (for difficulty) & Check if anyone else finished
        const { data: room, error: roomError } = await supabase
            .from("challenge_rooms")
            .select("difficulty")
            .eq("id", roomId)
            .single()

        if (roomError || !room) {
            return NextResponse.json({ error: "Room not found." }, { status: 404 })
        }

        // Check for existing winners (participants who completed BEFORE this request)
        const { count: existingWinners } = await supabase
            .from("participants")
            .select("*", { count: 'exact', head: true })
            .eq("challenge_room_id", roomId)
            .eq("has_completed", true)

        // 2. Calculate Points
        let pointsEarned = 0
        let isWinner = false

        if (passed) {
            const basePoints = DIFFICULTY_POINTS[room.difficulty] || 1
            const winBonus = (existingWinners === 0) ? 2 : 0
            pointsEarned = basePoints + winBonus
            if (winBonus > 0) isWinner = true
        }

        // 3. Update Participant
        const now = new Date().toISOString()
        const updateData = {
            has_completed: passed,
            last_submitted_at: now,
            current_code: code
        }

        if (passed) {
            updateData.completed_at = now
            updateData.status = 'completed'
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

        // 4. Update Profile Points (if passed)
        if (passed && pointsEarned > 0) {
            // We need to fetch current points first to increment
            // Ideally we'd use an RBC or a stored procedure to increment safely, 
            // but for now read-modify-write.
            const { data: profile } = await supabase
                .from("profiles")
                .select("points")
                .eq("id", user.id)
                .single()

            const currentPoints = profile?.points || 0
            const newTotal = currentPoints + pointsEarned

            await supabase
                .from("profiles")
                .update({ points: newTotal })
                .eq("id", user.id)
        }

        // 5. Check if all participants completed (Room Completion Logic)
        const { count: totalParticipants } = await supabase
            .from("participants")
            .select("*", { count: 'exact', head: true })
            .eq("challenge_room_id", roomId)

        const { count: completedParticipants } = await supabase
            .from("participants")
            .select("*", { count: 'exact', head: true })
            .eq("challenge_room_id", roomId)
            .eq("has_completed", true)

        if (totalParticipants && completedParticipants && totalParticipants === completedParticipants) {
            await supabase
                .from("challenge_rooms")
                .update({ status: "completed", ended_at: new Date().toISOString() })
                .eq("id", roomId)
        }

        return NextResponse.json({
            success: true,
            pointsEarned,
            isWinner
        })

    } catch (error) {
        console.error("Unexpected error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
