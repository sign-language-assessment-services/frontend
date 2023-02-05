import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AssessmentsPage } from './assessments'
import PrivateRoute from './auth/PrivateRoute'

export const App = (): ReactElement => {
  return (
    <PrivateRoute requiredRole="slas-frontend-user">
      <Routes>
        <Route path="*" element={<AssessmentsPage />} />
      </Routes>
    </PrivateRoute>
  )
}
