import NextAuth, { Account } from 'next-auth'
import Keycloak from 'next-auth/providers/keycloak'
import { TokenEndpointResponse } from 'oauth4webapi'
import { JWT } from '@auth/core/jwt'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Keycloak({
      token: `${process.env.AUTH_KEYCLOAK_ISSUER_INTERNAL}/protocol/openid-connect/token`,
      authorization: `${process.env.AUTH_KEYCLOAK_ISSUER_EXTERNAL}/protocol/openid-connect/auth`,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER_EXTERNAL,
    }),
  ],
  debug: true,
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account) {
        // First-time login
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          id_token: account.id_token,
        }
      } else if (Date.now() + 1000 < token.expires_at * 1000) {
        // Access token still valid
        return token
      } else {
        // Access token expired
        const newTokens = await refreshAccessToken(token.refresh_token as string)
        return {
          ...token,
          access_token: newTokens.access_token,
          expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in!),
        }
      }
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          sub: token.sub,
        },
        access_token: token.access_token,
        error: token.error,
      }
    },
  },

  events: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    signOut: async ({ token }: { token: JWT }) => {
      await doFinalSignoutHandshake(token)
    },
  },
})

async function doFinalSignoutHandshake(jwt: JWT) {
  const { id_token } = jwt

  try {
    // Add the id_token_hint to the query string
    const params = new URLSearchParams()
    params.append('id_token_hint', id_token)
    const { status, statusText } = await fetch(
      `${process.env.AUTH_KEYCLOAK_ISSUER_INTERNAL}/protocol/openid-connect/logout?${params}`,
    )

    // The response body should contain a confirmation that the user has been logged out
    console.log('Completed post-logout handshake', status, statusText)
  } catch (e) {
    console.error('Unable to perform post-logout handshake', e)
  }
}

async function refreshAccessToken(refreshToken: string): Promise<TokenEndpointResponse> {
  const response = await fetch(
    `${process.env.AUTH_KEYCLOAK_ISSUER_INTERNAL}/protocol/openid-connect/token`,
    {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.AUTH_KEYCLOAK_ID!,
        client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    },
  )

  return await response.json()
}
