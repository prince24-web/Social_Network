import { AuthForm } from "@/components/auth-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-muted/40">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </main>
  );
}
