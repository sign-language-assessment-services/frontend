import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { HelloWorld } from './HelloWorld'
import { getHelloWorldMessage } from './helloWorldService'
import { mocked } from 'ts-jest/utils'

jest.mock('./helloWorldService')

describe('HelloWorld', () => {
  it('shows hello world', async () => {
    // given
    mocked(getHelloWorldMessage).mockResolvedValue('Hello Mocked World!')

    // when
    render(<HelloWorld />)

    // then
    await waitFor(() => expect(screen.getByText(/hello mocked world!/i)).toBeInTheDocument())
  })

  it('shows error message when request for hello world message fails', async () => {
    // given
    mocked(getHelloWorldMessage).mockRejectedValue(new Error('mocked error'))

    // when
    render(<HelloWorld />)

    // then
    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument())
  })

  it('shows loading message while request is pending', async () => {
    // when
    render(<HelloWorld />)

    // then
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waitFor(() => expect(getHelloWorldMessage).toHaveBeenCalled())
  })
})
