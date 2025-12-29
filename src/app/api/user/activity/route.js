import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { eachDayOfInterval, formatISO, subDays, parseISO } from "date-fns";

export async function GET(request) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json(
                { error: "Username is required" },
                { status: 400 }
            );
        }

        // Get user ID from username
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("id")
            .eq("username", username)
            .single();

        if (profileError || !profile) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userId = profile.id;

        // Get submissions from the past 365 days
        const today = new Date();
        const startDate = subDays(today, 365);
        const isoStartDate = startDate.toISOString();

        // 1. Fetch Challenge Participants (Multiplayer)
        const { data: multiplayerSubmissions, error: mpError } = await supabase
            .from("participants")
            .select("last_submitted_at")
            .eq("user_id", userId)
            .gte("last_submitted_at", isoStartDate)
            .not("last_submitted_at", "is", null);

        if (mpError) {
            console.error("Error fetching multiplayer submissions:", mpError);
        }

        // 2. Fetch Training Submissions (Solo practice)
        const { data: trainingSubmissions, error: trainingError } = await supabase
            .from("training_submissions")
            .select("submitted_at")
            .eq("user_id", userId)
            .gte("submitted_at", isoStartDate);

        if (trainingError) {
            console.error("Error fetching training submissions:", trainingError);
        }

        // Group submissions by date
        const activityMap = new Map();

        const processSubmission = (dateString) => {
            if (!dateString) return;
            const date = formatISO(parseISO(dateString), {
                representation: "date",
            });
            activityMap.set(date, (activityMap.get(date) || 0) + 1);
        }

        // Process Multiplayer
        (multiplayerSubmissions || []).forEach(sub => processSubmission(sub.last_submitted_at));

        // Process Training
        (trainingSubmissions || []).forEach(sub => processSubmission(sub.submitted_at));


        // Generate activity data for each day in the range
        const days = eachDayOfInterval({ start: startDate, end: today });
        const activityData = days.map((day) => {
            const date = formatISO(day, { representation: "date" });
            const count = activityMap.get(date) || 0;
            // Calculate level (0-4) based on count
            let level = 0;
            if (count >= 1) level = 1;
            if (count >= 3) level = 2;
            if (count >= 5) level = 3;
            if (count >= 8) level = 4;

            return { date, count, level };
        });

        return NextResponse.json({ data: activityData });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
