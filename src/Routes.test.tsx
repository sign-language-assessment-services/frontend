import { render, screen } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Routes } from './Routes'

// Mock sub-components so that we can assert they are rendered without retesting their internals
jest.mock('./hello-world', () => ({
  HelloWorld: function HelloWorld() {
    return <span data-testid="HelloWorld" />
  },
}))

jest.mock('./assessments', () => ({
  AssessmentsPage: function AssessmentsPage() {
    return <span data-testid="AssessmentsPage" />
  },
}))

describe('Routes', () => {
  it('includes HelloWorld component', () => {
    renderWithRouter(<Routes />, '/')
    expect(screen.getByTestId('HelloWorld')).toBeInTheDocument()
  })

  it('renders Assessments if route matches', () => {
    renderWithRouter(<Routes />, '/assessments')
    expect(screen.getByTestId('AssessmentsPage')).toBeInTheDocument()
  })
})

const renderWithRouter = (children: ReactNode, route = '/') =>
  render(<MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>)
