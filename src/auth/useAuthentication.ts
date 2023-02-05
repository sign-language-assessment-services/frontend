import { useKeycloak } from '@react-keycloak/web'
import { useCallback } from 'react'

export const useAuthentication = () => {
  if (import.meta.env.VITE_AUTH_ENABLED !== 'true') {
    return {
      accessToken: '',
      authenticationEnabled: false,
      authenticated: true,
      initialized: true,
      logout: () => {
        return
      },
      accountManagement: () => {
        return
      },
      userHasRole: () => true,
      user: null,
    }
  }
  const { keycloak, initialized } = useKeycloak()
  return {
    accessToken: keycloak.token,
    authenticationEnabled: true,
    authenticated: keycloak.authenticated,
    initialized,
    userHasRole: useCallback(
      (role: string) => keycloak.hasRealmRole(role),
      [keycloak.realmAccess?.roles],
    ),
    logout: useCallback(() => keycloak.logout(), [keycloak]),
    accountManagement: useCallback(() => keycloak.accountManagement(), [keycloak]),
    user: {
      name: keycloak.idTokenParsed?.name,
      username: keycloak.idTokenParsed?.preferred_username,
    },
  }
}
