// noinspection ES6UnusedImports

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    access_token: string
    user: {
      sub: string
      name: string
    }
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    access_token: string
    id_token: string
    expires_at: number
    refresh_token?: string
  }
}
