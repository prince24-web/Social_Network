import { AuthForm } from "@/components/auth-form"

export default async function LoginPage({ searchParams }) {
    const params = await searchParams
    const next = params.next || "/onboarding"

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-muted/40">
            <div className="w-full max-w-md">
                <AuthForm next={next} />
            </div>
        </main>
    );
}
