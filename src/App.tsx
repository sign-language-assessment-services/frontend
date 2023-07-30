import React from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { AssessmentsPage } from './pages/AssessmentsPage'
import PrivateRoute from './auth/PrivateRoute'
import { NotFound } from './pages/NotFound/NotFound'
import { AssessmentsListPage } from './pages/AssessmentsListPage'

export const App: React.FC = () => {
  const routes: RouteObject[] = [
    {
      children: [
        { index: true, element: <AssessmentsListPage /> },
        { path: 'assessments', element: <AssessmentsListPage /> },
        { path: 'assessments/:id', element: <AssessmentsPage /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
  return <PrivateRoute requiredRole="slas-frontend-user">{useRoutes(routes)}</PrivateRoute>
}
