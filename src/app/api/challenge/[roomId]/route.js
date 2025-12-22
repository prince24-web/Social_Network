
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        const supabase = await createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { roomId } = await params

        // 1. Fetch Room Details
        const { data: room, error: roomError } = await supabase
            .from("challenge_rooms")
            .select("*")
            .eq("id", roomId)
            .single()

        if (roomError || !room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 })
        }

        // 2. Verify Participant
        // (Ideally we check if user is in 'participants' table, but for now we trust RLS or add explicit check)
        const { data: participant } = await supabase
            .from("participants")
            .select("id")
            .eq("challenge_room_id", roomId)
            .eq("user_id", user.id)
            .single()

        if (!participant) {
            return NextResponse.json({ error: "You are not a participant of this room." }, { status: 403 })
        }

        // 3. Fetch Challenge Content (DB Version)
        if (!room.challenge_id) {
            return NextResponse.json({
                room,
                challenge: null,
                message: "Challenge not yet selected (Game waiting)"
            })
        }

        try {
            const { data: challenge, error: challengeError } = await supabase
                .from('challenges')
                .select('*')
                .eq('id', room.challenge_id)
                .single()

            if (challengeError || !challenge) {
                console.error(`Challenge ID ${room.challenge_id} not found in DB`)
                return NextResponse.json({ error: "Challenge content missing." }, { status: 500 })
            }

            // Return Room + Challenge
            return NextResponse.json({
                room,
                challenge
            })

        } catch (err) {
            console.error("Error reading challenge from DB:", err)
            return NextResponse.json({ error: "Failed to load challenge content." }, { status: 500 })
        }

    } catch (error) {
        console.error("Unexpected error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
