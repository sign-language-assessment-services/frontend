import { useKeycloak } from '@react-keycloak/web'

export const useAuthentication = () => {
  if (import.meta.env.VITE_AUTH_ENABLED !== 'true') {
    return {
      accessToken: '',
      authenticationEnabled: false,
      authenticated: true,
      initialized: true,
      login: () => {
        return
      },
      logout: () => {
        return
      },
      userHasRole: () => true,
    }
  }
  const { keycloak, initialized } = useKeycloak()
  return {
    accessToken: keycloak.token,
    authenticationEnabled: true,
    authenticated: keycloak.authenticated,
    initialized,
    userHasRole: (role: string) => (keycloak.realmAccess?.roles ?? []).indexOf(role) !== -1,
    login: keycloak.login,
    logout: keycloak.logout,
  }
}
