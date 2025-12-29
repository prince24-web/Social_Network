
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request) {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("language")

    if (!language) {
        return NextResponse.json({ error: "Language is required" }, { status: 400 })
    }

    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // 1. Fetch solved count
        // Note: Distinct challenge_ids in case of multiple submissions? 
        // training_submissions doesn't enforce unique constraint on (user_id, challenge_id) yet but we should count unique.

        const { data: solvedData, error: solvedError } = await supabase
            .from("training_submissions")
            .select("challenge_id")
            .eq("user_id", user.id)

        if (solvedError) throw solvedError

        // Filter solved by language (requires join or fetch challenges first)
        // Optimized approach: Fetch all challenges for language first.

        const { data: challenges, error: challengesError } = await supabase
            .from("challenges")
            .select("id, difficulty")
            .eq("language", language)

        if (challengesError) throw challengesError

        const challengeIds = new Set(challenges.map(c => c.id))
        const solvedSet = new Set()

        solvedData.forEach(sub => {
            if (challengeIds.has(sub.challenge_id)) {
                solvedSet.add(sub.challenge_id)
            }
        })

        const solvedCount = solvedSet.size
        const totalCount = challenges.length

        // Determine next difficulty
        // Re-use logic: sort challenges, find first unsolved
        const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 }
        const sortedChallenges = challenges.sort((a, b) => {
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        })

        const nextChallenge = sortedChallenges.find(c => !solvedSet.has(c.id))
        const nextDifficulty = nextChallenge ? nextChallenge.difficulty : "completed"

        return NextResponse.json({
            solvedCount,
            totalCount,
            nextDifficulty
        })

    } catch (err) {
        console.error("Error fetching progress:", err)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
