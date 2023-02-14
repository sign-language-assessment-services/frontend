import React from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { AssessmentsPage } from './assessments'
import PrivateRoute from './auth/PrivateRoute'
import { NotFound } from './pages/NotFound'

export const App: React.FC = () => {
  const routes: RouteObject[] = [
    {
      children: [
        { index: true, element: <AssessmentsPage /> },
        { path: 'assessments', element: <AssessmentsPage /> },
        { path: 'assessments/1', element: <AssessmentsPage /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
  return <PrivateRoute requiredRole="slas-frontend-user">{useRoutes(routes)}</PrivateRoute>
}
