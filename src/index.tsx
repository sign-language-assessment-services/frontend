import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

import { createRoot } from 'react-dom/client'
import { AuthenticationProvider } from './auth/AuthenticationProvider'
import { LoadingIndicator } from './assessments/LoadingIndicator'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <Suspense fallback={<LoadingIndicator />}>
    <AuthenticationProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </AuthenticationProvider>
  </Suspense>,
)
