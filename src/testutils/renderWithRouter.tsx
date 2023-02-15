import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

export const renderWithRouter = (children: ReactNode, route = '/') =>
  render(<MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>)
