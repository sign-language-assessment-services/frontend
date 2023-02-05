import React, { PropsWithChildren } from 'react'
import { useAuthentication } from './useAuthentication'
import { ErrorModal } from '../components/ErrorModal'

interface Props extends PropsWithChildren {
  requiredRole: string
}

const PrivateRoute: React.FC<Props> = ({ requiredRole, children }) => {
  const { userHasRole, logout, initialized } = useAuthentication()
  if (!initialized) {
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
