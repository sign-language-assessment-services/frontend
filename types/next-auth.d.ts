// noinspection ES6UnusedImports

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    sub: string
    name: string
  }

  interface Session {
    access_token: string
    user: User
    expires: string
    error: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string
    name: string
    email: string
    access_token: string
    refresh_token: string
    id_token: string
    error: string
    expires_at: number
  }
}
