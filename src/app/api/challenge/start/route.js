
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
        const { roomId } = body

        if (!roomId) {
            return NextResponse.json({ error: "Room ID is required." }, { status: 400 })
        }

        // 1. Verify Creator
        const { data: room, error: roomError } = await supabase
            .from("challenge_rooms")
            .select("created_by, status, language, difficulty")
            .eq("id", roomId)
            .single()

        if (roomError || !room) {
            return NextResponse.json({ error: "Room not found." }, { status: 404 })
        }

        if (room.created_by !== user.id) {
            return NextResponse.json({ error: "Only the creator can start the challenge." }, { status: 403 })
        }

        if (room.status !== "waiting") {
            return NextResponse.json({ error: "Challenge has already started or finished." }, { status: 400 })
        }

        // --- NEW: Select Random Challenge (DB Version) ---
        let now; // Declare now outside the try block to be accessible later
        try {
            // 1. Fetch available challenges fitting criteria
            const { data: challenges, error: fetchError } = await supabase
                .from('challenges')
                .select('id')
                .eq('language', room.language)
                .eq('difficulty', room.difficulty)

            if (fetchError || !challenges || challenges.length === 0) {
                console.error("Challenge fetch error:", fetchError)
                throw new Error("No challenges found for this configuration")
            }

            // 2. Pick Random
            const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
            const selectedChallengeId = randomChallenge.id

            // 3. Update Room
            now = new Date().toISOString()
            const { error: updateError } = await supabase
                .from("challenge_rooms")
                .update({
                    status: "active",
                    started_at: now,
                    challenge_id: selectedChallengeId
                })
                .eq("id", roomId)

            if (updateError) {
                console.error("Start room error:", updateError)
                return NextResponse.json({ error: "Failed to start room." }, { status: 500 })
            }

        } catch (err) {
            console.error("Error selecting challenge:", err)
            return NextResponse.json({ error: "Failed to load challenge data." }, { status: 500 })
        }

        // 3. Mark participants as started
        const { error: participantsError } = await supabase
            .from("participants")
            .update({ started_at: now })
            .eq("challenge_room_id", roomId)

        if (participantsError) {
            console.error("Update participants error:", participantsError)
            // Non-critical (?) but good to log
        }

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error("Unexpected error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
