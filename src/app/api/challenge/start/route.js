
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
import { promises as fs } from 'fs'
import path from 'path'

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
            .select("created_by, status")
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

        // --- NEW: Select Random Challenge ---
        try {
            const langDir = room.language === 'python' ? 'python_challenges' : 'javascript_challenges'
            const filePath = path.join(process.cwd(), 'src', 'challenges', langDir, room.difficulty, `${room.difficulty}_challenges.json`)

            const fileContent = await fs.readFile(filePath, 'utf-8')
            const challenges = JSON.parse(fileContent)

            if (!challenges || challenges.length === 0) {
                throw new Error("No challenges found for this configuration")
            }

            const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
            const selectedChallengeId = randomChallenge.id

            // Update Room with Status AND Challenge ID
            const now = new Date().toISOString()
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
