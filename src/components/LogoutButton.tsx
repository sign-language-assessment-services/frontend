import React from 'react'
import { useAuthentication } from '../auth/useAuthentication'

export const LogoutButton = () => {
  const { logout } = useAuthentication()
  return (
    <div>
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}
