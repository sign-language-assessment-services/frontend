import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { AssessmentsPage } from './AssessmentsPage'
import { Assessment } from './models'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fallbackSettings } from '../../settings/Settings'

describe('AssessmentsPage', () => {
  const sampleAssessment: Assessment = {
    name: 'Animals',
    items: [
      {
        description: 'Who is better?',
        choices: [
          { type: 'text', label: 'Cats' },
          { type: 'text', label: 'Dogs' },
        ],
      },
    ],
  }
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockOnceIf('/api/assessments/1', JSON.stringify(sampleAssessment))
    fetchMock.mockOnceIf('/api/assessments/1/submissions/', JSON.stringify({ score: 1337010 }))
    vi.mock('../settings/useSettings', () => ({
      useSettings: () => fallbackSettings,
    }))
  })

  it('submits chosen input', async () => {
    render(<AssessmentsPage />)
    expect(fetch).toHaveBeenCalledWith('/api/assessments/1', expect.anything())

    await waitUntilSubmitButtonRendered()
    await userEvent.click(screen.getByLabelText(/cats/i))

    await userEvent.click(submitButton())
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(`/api/assessments/1/submissions/`, {
        method: 'POST',
        body: JSON.stringify({ '0': ['0'] }),
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      }),
    )
  })

  it('displays score returned from backend after submission', async () => {
    render(<AssessmentsPage />)
    await waitUntilSubmitButtonRendered()
    await userEvent.click(submitButton())
    await waitFor(() => expect(screen.getByText(/1337010/)).toBeInTheDocument())
  })

  it('hides Submit button and Form after getting scoring results', async () => {
    render(<AssessmentsPage />)
    await waitUntilSubmitButtonRendered()
    expect(screen.getByRole('checkbox', { name: /Cats/i })).toBeInTheDocument()
    await userEvent.click(submitButton())
    expect(screen.queryByRole('button', { name: /test absenden/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: /Cats/i })).not.toBeInTheDocument()
  })
})

const waitUntilSubmitButtonRendered = async () =>
  await waitFor(() => expect(submitButton()).toBeInTheDocument())
const submitButton = () => button(/test absenden/i)
const button = (name: RegExp) => screen.getByRole('button', { name })
