import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'

// Mock HelloWorld component so that we can assert it is rendered
jest.mock('./hello-world', () => ({
  HelloWorld: function HelloWorld() {
    return <span data-testid="HelloWorld" />
  },
}))

describe('App', () => {
  it('includes HelloWorld component', () => {
    render(<App />)
    expect(screen.getByTestId('HelloWorld')).toBeInTheDocument()
  })
})
