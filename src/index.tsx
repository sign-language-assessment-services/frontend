import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

import { createRoot } from 'react-dom/client'
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
