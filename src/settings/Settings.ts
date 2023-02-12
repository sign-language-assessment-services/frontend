export interface Settings {
  authEnabled: boolean
  keycloakClientId: string
  keycloakRealm: string
  keyCloakUrl: string
}

export const fallbackSettings = {
  authEnabled: false,
  keyCloakUrl: '',
  keycloakRealm: '',
  keycloakClientId: '',
}
