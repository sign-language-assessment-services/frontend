import React from 'react'
import { useAuthentication } from './useAuthentication'

interface Props {
  requiredRole: string
}

const PrivateRoute = ({ requiredRole, children }: React.PropsWithChildren<Props>) => {
  const { authenticated, userHasRole } = useAuthentication()

  if (!authenticated) {
    return <>Not authenticated</>
  }

  if (!userHasRole(requiredRole)) {
    return <>Not authorized</>
  }

  return <>{children}</>
}

export default PrivateRoute
