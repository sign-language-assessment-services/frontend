import { useAuthentication } from '../auth/useAuthentication'
import { LogoutButton } from './LogoutButton'
import { LoginButton } from './LoginButton'
import { UserInfo } from './UserInfo'
import React from 'react'

export const UserPanel = () => {
  const { authenticated } = useAuthentication()
  return (
    <>
      {authenticated ? <LogoutButton /> : <LoginButton />}
      <UserInfo />
    </>
  )
}
