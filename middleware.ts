import { signIn, auth } from '@/lib/auth'

export default auth(async (req) => {
  if (!req.auth && !req.nextUrl.pathname.startsWith('/api/auth')) {
    const url = await getKeycloakSignInUrl()
    return Response.redirect(url)
  }
})

async function getKeycloakSignInUrl() {
  'use server'
  return await signIn('keycloak', { redirect: false })
}

export const config = {
  matcher: ['/((?!health|favicon.ico).*)'],
}
