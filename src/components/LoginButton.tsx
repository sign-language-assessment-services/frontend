import React from 'react'
import { useAuthentication } from '../auth/useAuthentication'

export const LoginButton = () => {
  const { login } = useAuthentication()
  return (
    <div>
      <button type="button" onClick={() => login()}>
        Login
      </button>
    </div>
  )
}
