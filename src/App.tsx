import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AssessmentsPage } from './assessments'
import PrivateRoute from './auth/PrivateRoute'
import { useAuthentication } from './auth/useAuthentication'
import { LoadingIndicator } from './assessments/LoadingIndicator'
import { LoginButton } from './components/LoginButton'

export const App = (): ReactElement => {
  const { initialized, authenticationEnabled, authenticated } = useAuthentication()
  if (!initialized) {
    return <LoadingIndicator />
  }
  return (
    <div className="">
      {authenticationEnabled && !authenticated ? <LoginButton /> : null}
      <PrivateRoute requiredRole="slas-frontend-user">
        <Routes>
          <Route path="/assessments/*" element={<AssessmentsPage />} />
          <Route path="/" element={<AssessmentsPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </PrivateRoute>
    </div>
  )
}
