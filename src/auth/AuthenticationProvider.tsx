import { ReactKeycloakProvider } from '@react-keycloak/web'
import React, { useState } from 'react'
import { AccessTokenContext } from './AccessTokenContext'
import { useSettings } from '../settings/useSettings'
import { useKeycloakClient } from './keycloakClient'

export const AuthenticationProvider = ({ children }: React.PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  const { authEnabled } = useSettings()
  const keycloakClient = useKeycloakClient()

  if (!authEnabled) {
    return <>{children}</>
  }

  if (!keycloakClient) {
    return null
  }

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
