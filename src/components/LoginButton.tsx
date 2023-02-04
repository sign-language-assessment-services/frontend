import React from 'react'
import { useAuthentication } from '../auth/useAuthentication'
import { Button } from './Button'

export const LoginButton = () => {
  const { login } = useAuthentication()
  return <Button onClick={() => login()}>Login</Button>
}
