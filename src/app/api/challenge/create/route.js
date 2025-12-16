
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(request) {
    try {
        const supabase = await createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { language, difficulty, maxPlayers } = body

        // Validate input
        if (!["python", "javascript"].includes(language)) {
            return NextResponse.json({ error: "Invalid language. Must be 'python' or 'javascript'." }, { status: 400 })
        }
        if (!difficulty) {
            return NextResponse.json({ error: "Difficulty is required." }, { status: 400 })
        }
        if (maxPlayers < 2) {
            return NextResponse.json({ error: "Max players must be at least 2." }, { status: 400 })
        }


        // Generate a unique invite token
        // Use a short random string or UUID. UUID is safer for now.
        // To make it prettier we could use nanoid, but let's stick to standard deps or simple random.
        // Let's use a simple alphanumeric string.
        const inviteToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        // 1. Create Room
        const { data: room, error: roomError } = await supabase
            .from("challenge_rooms")
            .insert({
                created_by: user.id,
                language,
                difficulty,
                max_players: maxPlayers,
                invite_token: inviteToken,
                status: "waiting"
            })
            .select()
            .single()

        if (roomError) {
            console.error("Room creation error:", roomError)
            return NextResponse.json({ error: roomError.message }, { status: 500 })
        }

        // 2. Add Creator as Participant
        const { error: participantError } = await supabase
            .from("participants")
            .insert({
                user_id: user.id,
                challenge_room_id: room.id,
                language: language
            })

        if (participantError) {
            console.error("Participant creation error:", participantError)
            // Cleanup room if participant creation fails? Ideally yes, but for now just error.
            return NextResponse.json({ error: "Failed to join room as creator." }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            roomId: room.id,
            inviteToken: room.invite_token
        })

    } catch (error) {
        console.error("Unexpected error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
