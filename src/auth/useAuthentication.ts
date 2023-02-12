import { useKeycloak } from '@react-keycloak/web'
import { useCallback } from 'react'
import { useSettings } from '../settings/useSettings'

export const useAuthentication = () => {
  const { authEnabled } = useSettings()
  if (!authEnabled) {
    return {
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
