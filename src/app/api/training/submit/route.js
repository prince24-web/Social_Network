
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const supabase = await createClient()
        const body = await request.json()
        const { challengeId, passed, duration, code } = body

        if (!challengeId || passed === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Get authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!passed) {
            return NextResponse.json({ message: "Not passed, no points awarded." })
        }

        // Fetch challenge details for difficulty
        const { data: challenge, error: challengeError } = await supabase
            .from("challenges")
            .select("difficulty")
            .eq("id", challengeId)
            .single()

        if (challengeError || !challenge) {
            return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
        }

        // Calculate points
        let points = 0
        switch (challenge.difficulty) {
            case 'easy': points = 1; break;
            case 'medium': points = 2; break;
            case 'hard': points = 3; break;
            default: points = 1;
        }

        // 1. Record Submission
        const { error: submissionError } = await supabase
            .from("training_submissions")
            .insert({
                user_id: user.id,
                challenge_id: challengeId,
                points_earned: points,
                duration_seconds: duration || 0
            })

        if (submissionError) {
            console.error("Error recording submission:", submissionError)
            return NextResponse.json({ error: "Failed to record submission" }, { status: 500 })
        }

        // 2. Update User Profile Points
        // We need to fetch current points first or use an RPC increment function.
        // For simplicity, we'll fetch and update, but RPC is better for concurrency.
        // Assuming no heavy concurrency per user for now.

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("points")
            .eq("id", user.id)
            .single()

        if (profileError) {
            console.error("Error fetching profile:", profileError)
            // Non-blocking but bad
        }

        const newPoints = (profile?.points || 0) + points

        const { error: updateError } = await supabase
            .from("profiles")
            .update({ points: newPoints })
            .eq("id", user.id)

        if (updateError) {
            console.error("Error updating points:", updateError)
        }

        return NextResponse.json({
            success: true,
            pointsEarned: points,
            totalPoints: newPoints
        })

    } catch (err) {
        console.error("Submit error:", err)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
