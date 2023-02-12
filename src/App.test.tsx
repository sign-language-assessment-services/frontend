import { render, screen } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { App } from './App'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fallbackSettings } from './settings/Settings'

describe('Routes', () => {
  beforeEach(() => {
    // Mock sub-components so that we can assert they are rendered without retesting their internals
    vi.mock('./assessments', () => ({
      AssessmentsPage: function AssessmentsPage() {
        return <span data-testid="AssessmentsPage" />
      },
    }))
    vi.mock('./settings/useSettings', () => ({
      useSettings: () => fallbackSettings,
    }))
  })
  it('renders Assessments if route matches', () => {
    renderWithRouter(<App />, '/assessments')
    expect(screen.getByTestId('AssessmentsPage')).toBeInTheDocument()
  })
})

const renderWithRouter = (children: ReactNode, route = '/') =>
  render(<MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>)
