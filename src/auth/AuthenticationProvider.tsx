import { ReactKeycloakProvider } from '@react-keycloak/web'
import React from 'react'
import Keycloak from 'keycloak-js'

export const AuthenticationProvider = ({ children }: React.PropsWithChildren) => {
  if (import.meta.env.VITE_AUTH_ENABLED !== 'true') {
    return <>{children}</>
  }

  const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  })

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
      {children}
    </ReactKeycloakProvider>
  )
}
