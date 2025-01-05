import { signIn, auth } from '@/lib/auth'

export default auth(async (req) => {
  if (!req.auth && !req.nextUrl.pathname.startsWith('/api/auth')) {
    const url = await getKeycloakSignInUrl(req.url)
    return Response.redirect(url)
  }
})

async function getKeycloakSignInUrl(url: string) {
  'use server'
  return await signIn('keycloak', { redirect: false, redirectTo: url })
}

export const config = {
  matcher: ['/((?!health|favicon.ico).*)'],
}
