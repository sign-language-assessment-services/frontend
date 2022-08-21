import React, { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AssessmentsPage } from './assessments'

export const App = (): ReactElement => (
  <Routes>
    <Route path="/assessments/*" element={<AssessmentsPage />} />
    <Route path="/" element={<AssessmentsPage />} />
    <Route path="*" element={<div>Not Found</div>} />
  </Routes>
)
