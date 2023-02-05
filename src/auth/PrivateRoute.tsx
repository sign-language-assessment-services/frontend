import React, { PropsWithChildren, useState } from 'react'
import { useAuthentication } from './useAuthentication'
import { ErrorModal } from '../components/ErrorModal'

interface Props extends PropsWithChildren {
  requiredRole: string
}

const PrivateRoute: React.FC<Props> = ({ requiredRole, children }) => {
  const { authenticated, userHasRole, login, logout, initialized } = useAuthentication()
  const [redirecting, setRedirecting] = useState(false)
  if (!initialized) {
    return null
  }
  if (!authenticated) {
    setRedirecting(true)
    login()
  }

  if (redirecting) {
    return null
  }
  if (!userHasRole(requiredRole)) {
    return (
      <ErrorModal
        title="Keine Berechtigung"
        message="Sie sind nicht berechtigt, diese Anwendung zu nutzen."
        closeLabel="Abmelden"
        onClose={() => logout()}
      />
    )
  }

  return <>{children}</>
}

export default PrivateRoute
