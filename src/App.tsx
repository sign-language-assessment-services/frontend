import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AssessmentsPage } from './assessments'
import PrivateRoute from './auth/PrivateRoute'
import { useAuthentication } from './auth/useAuthentication'
import { LoadingIndicator } from './assessments/LoadingIndicator'
import { UserPanel } from './components/UserPanel'

export const App = (): ReactElement => {
  const { initialized, authenticationEnabled } = useAuthentication()
  if (!initialized) {
    return <LoadingIndicator />
  }
  return (
    <>
      {authenticationEnabled ? <UserPanel /> : null}
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
