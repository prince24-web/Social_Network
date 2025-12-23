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

        const { data: submissions, error: submissionsError } = await supabase
            .from("participants")
            .select("last_submitted_at")
            .eq("user_id", userId)
            .gte("last_submitted_at", startDate.toISOString())
            .not("last_submitted_at", "is", null);

        if (submissionsError) {
            console.error("Error fetching submissions:", submissionsError);
            return NextResponse.json(
                { error: "Failed to fetch activity" },
                { status: 500 }
            );
        }

        // Group submissions by date
        const activityMap = new Map();

        for (const sub of submissions || []) {
            const date = formatISO(parseISO(sub.last_submitted_at), {
                representation: "date",
            });
            activityMap.set(date, (activityMap.get(date) || 0) + 1);
        }

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
