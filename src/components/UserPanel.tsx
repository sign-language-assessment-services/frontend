import { useAuthentication } from '../auth/useAuthentication'
import React from 'react'
import { AvatarIcon } from './AvatarIcon'

export const UserPanel = () => {
  const { user, authenticationEnabled, logout, accountManagement } = useAuthentication()
  if (!authenticationEnabled) {
    return null
  }
  return (
    <div className="flex items-center gap-4">
      <a
        href="#"
        title="Profil verwalten"
        onClick={() => accountManagement()}
        className="flex items-center gap-2 hover:drop-shadow-lg"
      >
        <span className="text-sm">{user?.name}</span>
        <AvatarIcon />
      </a>
      <a className="font-bold text-sm hover:drop-shadow-lg" href="#" onClick={() => logout()}>
        Abmelden
      </a>
    </div>
  )
}
