import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'

            // Ensure next starts with / to avoid bad URL construction
            const safeNext = next.startsWith('/') ? next : `/${next}`

            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${safeNext}`)
            } else if (forwardedHost) {
                // In case of multiple forwarded hosts, take the first one and trim whitespace
                const host = forwardedHost.split(',')[0].trim()
                return NextResponse.redirect(`https://${host}${safeNext}`)
            } else {
                return NextResponse.redirect(`${origin}${safeNext}`)
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
