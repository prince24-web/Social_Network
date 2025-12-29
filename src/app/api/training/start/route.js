
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request) {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("language")
    const difficulty = searchParams.get("difficulty")

    if (!language || !difficulty) {
        return NextResponse.json({ error: "Language and difficulty are required" }, { status: 400 })
    }

    try {
        // Fetch a random challenge matching the criteria
        // Note: 'random()' in order by might differ by SQL dialect but Supabase supports it via pg extension or just simple random()
        // OR we can fetch all IDs and pick one in JS if dataset is small.
        // For Postgres: order by random()

        const { data, error } = await supabase
            .from("challenges")
            .select("id")
            .eq("language", language)
            .eq("difficulty", difficulty)
        // .order('random()') // Supabase JS doesn't support .order('random()') directly often without RPC

        // Workaround for random: fetch all IDs and pick one. Dataset is small (<100 likely).

        if (error) throw error

        if (!data || data.length === 0) {
            return NextResponse.json({ error: "No challenges found for these criteria" }, { status: 404 })
        }

        const randomIndex = Math.floor(Math.random() * data.length)
        const randomChallenge = data[randomIndex]

        return NextResponse.json({ challengeId: randomChallenge.id })

    } catch (err) {
        console.error("Error fetching training challenge:", err)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
