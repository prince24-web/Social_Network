import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request) {
    const supabase = await createClient();

    // 1. Check Auth Session
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // 2. No Session -> Redirect to Login
        return redirect("/login");
    }

    // 3. Has Session -> Check Profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

    if (profile && profile.username) {
        // 4. Completed -> Redirect to Profile
        return redirect(`/u/${profile.username}`);
    } else {
        // 5. Incomplete -> Redirect to Onboarding
        return redirect("/onboarding");
    }
}
