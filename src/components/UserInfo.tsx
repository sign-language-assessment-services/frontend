import { useKeycloak } from '@react-keycloak/web'
import { ManageAccountButton } from './ManageAccountButton'
import React from 'react'

export const UserInfo = () => {
  const {
    keycloak: { authenticated, idTokenParsed, realmAccess, accountManagement, tokenParsed },
  } = useKeycloak()
  if (!authenticated) {
    return null
  }
  return (
    <>
      <div>
        Welcome, {idTokenParsed?.name} ({idTokenParsed?.preferred_username ?? 'unknown'})
      </div>
      <div>Roles: {realmAccess?.roles.join(', ')}</div>
      <div>
        <ManageAccountButton callback={() => accountManagement()} />
      </div>
      <pre>{JSON.stringify(tokenParsed, null, 2)}</pre>
    </>
  )
}
