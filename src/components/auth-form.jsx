"use client"

import * as React from "react"
import { Github } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function AuthForm({ className, next = "/onboarding", ...props }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState(null)
  
  const supabase = createClient()

  async function onEmailSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback?next=${next}`,
        },
      })

      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Check your email for the login link!' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' })
    } finally {
      setIsLoading(false)
    }
  }

  async function onGithubSubmit() {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${location.origin}/auth/callback?next=${next}`,
        },
      })
      if (error) {
        setMessage({ type: 'error', text: error.message })
        setIsLoading(false)
      }
      // If no error, we are redirecting, so no need to stop loading
    } catch (error) {
       console.error(error)
       setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={onEmailSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
          
          {message && (
             <div className={cn(
                "p-3 rounded text-sm text-center",
                message.type === 'error' ? "bg-destructive/15 text-destructive" : "bg-emerald-50 text-emerald-600"
             )}>
                {message.text}
             </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={isLoading} onClick={onGithubSubmit}>
            {isLoading ? (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}
            Github
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
             <div className="text-sm text-muted-foreground text-center">
                By clicking continue, you agree to our{" "}
                <a href="#" className="underline hover:text-primary">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-primary">
                    Privacy Policy
                </a>.
             </div>
        </CardFooter>
      </Card>
    </div>
  )
}
