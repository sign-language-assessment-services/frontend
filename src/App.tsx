import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AssessmentsPage } from './assessments'
import PrivateRoute from './auth/PrivateRoute'
import { LoginButton } from './components/LoginButton'
import { LogoutButton } from './components/LogoutButton'
import { useAuthentication } from './auth/useAuthentication'

export const App = (): ReactElement => {
  const { authenticated, initialized, authenticationEnabled } = useAuthentication()
  if (!initialized) {
    return <></>
  }
  return (
    <>
      {authenticationEnabled && (authenticated ? <LogoutButton /> : <LoginButton />)}
      <PrivateRoute requiredRole="slas-frontend-user">
        <Routes>
          <Route path="/assessments/*" element={<AssessmentsPage />} />
          <Route path="/" element={<AssessmentsPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </PrivateRoute>
    </>
  )
}
