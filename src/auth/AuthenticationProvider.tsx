import { ReactKeycloakProvider } from '@react-keycloak/web'
import React, { useState } from 'react'
import { keycloakClient } from './keycloakClient'
import { AccessTokenContext } from './AccessTokenContext'

export const AuthenticationProvider = ({ children }: React.PropsWithChildren) => {
  if (import.meta.env.VITE_AUTH_ENABLED !== 'true') {
    return <>{children}</>
  }
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)

  return (
    <ReactKeycloakProvider
      authClient={keycloakClient}
      initOptions={{ onLoad: 'login-required' }}
      onTokens={({ token }) => setAccessToken(token)}
    >
      <AccessTokenContext.Provider value={accessToken}>{children}</AccessTokenContext.Provider>
    </ReactKeycloakProvider>
  )
}
