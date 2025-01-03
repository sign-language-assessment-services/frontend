import { Account, AuthOptions, getServerSession, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import KeycloakProvider from 'next-auth/providers/keycloak'

export const oAuthConfig = KeycloakProvider({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  issuer: process.env.ISSUER_URL!,
})

export const authOptions: AuthOptions = {
  providers: [oAuthConfig],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }): Promise<JWT> {
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          access_token: account.access_token!,
          id_token: account.id_token!,
          expires_at: account.expires_at!,
          refresh_token: account.refresh_token!,
        }
      } else if (Date.now() < token.expires_at * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError('Missing refresh_token')

        try {
          const response = await fetch(oAuthConfig.accessTokenUrl!, {
            method: 'POST',
            body: new URLSearchParams({
              client_id: 'frontend-next',
              client_secret: 'frontend',
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token!,
            }),
          })

          const tokensOrError = await response.json()

          if (!response.ok) throw tokensOrError

          const newTokens = tokensOrError as {
            access_token: string
            id_token: string
            expires_in: number
            refresh_token?: string
          }
          return {
            ...token,
            access_token: newTokens.access_token,
            id_token: newTokens.id_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            // Some providers only issue refresh tokens once, so preserve if we did not get a new one
            refresh_token: newTokens.refresh_token ? newTokens.refresh_token : token.refresh_token,
          }
        } catch (error) {
          console.error('Error refreshing access_token', error)
          // If we fail to refresh the token, return an error so we can handle it on the page
          token.error = 'RefreshTokenError'
          return token
        }
      }
    },

    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token) {
        session.access_token = token.access_token
        session.error = token.error
        session.user = {
          name: token.name,
          sub: token.sub!,
          id: token.sub!,
        }
      }
      return session
    },
  },

  events: {
    signOut: async ({ token }: { token: JWT }) => await doFinalSignoutHandshake(token),
  },
}

export const getSession = () => getServerSession(authOptions)

async function doFinalSignoutHandshake(jwt: JWT) {
  const { id_token } = jwt

  try {
    // Add the id_token_hint to the query string
    const params = new URLSearchParams()
    params.append('id_token_hint', id_token)
    const { status, statusText } = await fetch(
      `${process.env.ISSUER_URL}/protocol/openid-connect/logout?${params}`,
    )

    // The response body should contain a confirmation that the user has been logged out
    console.log('Completed post-logout handshake', status, statusText)
  } catch (e) {
    console.error('Unable to perform post-logout handshake', e)
  }
}
