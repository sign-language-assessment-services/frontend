import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

import { createRoot } from 'react-dom/client'
import { AuthenticationProvider } from './auth/AuthenticationProvider'
import { LoadingIndicator } from './components/LoadingIndicator'
import { SettingsProvider } from './settings/SettingsProvider'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <SettingsProvider>
    <Suspense fallback={<LoadingIndicator />}>
      <AuthenticationProvider>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </AuthenticationProvider>
    </Suspense>
  </SettingsProvider>,
)
