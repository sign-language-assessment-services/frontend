import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AssessmentsPage } from './assessments'
import PrivateRoute from './auth/PrivateRoute'
import { useAuthentication } from './auth/useAuthentication'
import { LoadingIndicator } from './assessments/LoadingIndicator'

export const App = (): ReactElement => {
  const { initialized } = useAuthentication()
  if (!initialized) {
    return <LoadingIndicator />
  }
  return (
    <div className="">
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
