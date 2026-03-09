import { NextResponse } from 'next/server'
import { signIn, auth } from '@/lib/auth'

export default auth(async (req) => {
  if (!req.auth) {
    if (req.nextUrl.pathname === '/logged-out') return NextResponse.next()
    return Response.redirect(await getKeycloakSignInUrl(req.url))
  }
  return NextResponse.next()
})

async function getKeycloakSignInUrl(url: string) {
  'use server'
  return await signIn('keycloak', { redirect: false, redirectTo: url })
}

export const config = {
  // Don't run auth middleware for static assets, auth API, or health checks
  matcher: ['/((?!health|favicon\\.ico|_next|api/auth).*)'],
}
