
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

        // 1. Fetch Room details and current participants count
        const { data: room, error: roomError } = await supabase
            .from("challenge_rooms")
            .select(`
                *,
                participants (count)
            `)
            .eq("invite_token", inviteToken)
            .single()

        if (roomError || !room) {
            return NextResponse.json({ error: "Invalid invite link or room not found." }, { status: 404 })
        }

        // 2. Checks
        if (room.status !== "waiting") {
            return NextResponse.json({ error: "This room is no longer accepting players." }, { status: 403 })
        }

        const currentPlayers = room.participants[0]?.count || 0
        if (currentPlayers >= room.max_players) {
            return NextResponse.json({ error: "Room is full." }, { status: 403 })
        }

        // 3. User already joined?
        const { data: existingParticipant } = await supabase
            .from("participants")
            .select("id")
            .eq("challenge_room_id", room.id)
            .eq("user_id", user.id)
            .single()

        if (existingParticipant) {
            // Already joined, just return success + roomId
            return NextResponse.json({
                success: true,
                roomId: room.id,
                message: "You are already in this room."
            })
        }

        // 4. Join Room
        const { error: joinError } = await supabase
            .from("participants")
            .insert({
                user_id: user.id,
                challenge_room_id: room.id, // Fixed: use room.id, not inviteToken
                language: room.language // Use room's language setting for now
            })

        if (joinError) {
            console.error("Join room error:", joinError)
            return NextResponse.json({ error: "Failed to join room." }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            roomId: room.id
        })

    } catch (error) {
        console.error("Unexpected error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
