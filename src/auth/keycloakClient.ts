import Keycloak from 'keycloak-js'
import { useEffect, useState } from 'react'
import { useSettings } from '../settings/useSettings'

export const useKeycloakClient = () => {
  const [keycloakClient, setKeycloakClient] = useState<Keycloak>()
  const { keyCloakUrl, keycloakClientId, keycloakRealm } = useSettings()
  useEffect(() => {
    setKeycloakClient(
      new Keycloak({
        url: keyCloakUrl,
        realm: keycloakRealm,
        clientId: keycloakClientId,
      }),
    )
  }, [keyCloakUrl, keycloakRealm, keycloakClientId])

  return keycloakClient
}
