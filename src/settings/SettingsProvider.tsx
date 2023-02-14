import React, { useEffect, useState } from 'react'
import { SettingsContext } from './SettingsContext'
import { fallbackSettings, Settings } from './Settings'

export const SettingsProvider = ({ children }: React.PropsWithChildren) => {
  const [settings, setSettings] = useState<Settings>()

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await (await fetch('/settings.json')).json()
      const settings = response
        ? {
            authEnabled: response['AUTH_ENABLED'] === 'true',
            keycloakClientId: response['KEYCLOAK_CLIENT_ID'],
            keycloakRealm: response['KEYCLOAK_REALM'],
            keyCloakUrl: response['KEYCLOAK_URL'],
          }
        : fallbackSettings
      setSettings(settings)
    }
    fetchSettings()
  }, [])

  if (!settings) {
    return null
  }
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}
