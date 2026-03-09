import { NextResponse } from 'next/server'
import { signIn, auth } from '@/lib/auth'

export default auth(async (req) => {
  if (!req.auth) {
    if (
      req.nextUrl.pathname.startsWith('/api/auth') ||
      req.nextUrl.pathname === '/logged-out'
    ) {
      return NextResponse.next()
    }
    const url = await getKeycloakSignInUrl(req.url)
    return Response.redirect(url)
  }
  return NextResponse.next()
})

async function getKeycloakSignInUrl(url: string) {
  'use server'
  return await signIn('keycloak', { redirect: false, redirectTo: url })
}

export const config = {
  matcher: ['/((?!health|favicon.ico).*)'],
}
