import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fallbackSettings } from '../../settings/Settings'
import { renderWithRouter } from '../../testutils/renderWithRouter'
import { App } from '../../App'
import { Assessment } from './models/assessment'

describe('AssessmentsPage', () => {
  const sampleAssessment: Assessment = {
    name: 'Animals',
    items: [
      {
        position: 0,
        question: { text: 'Who is better?', type: 'text' },
        choices: [
          { type: 'text', text: 'Cats' },
          { type: 'text', text: 'Dogs' },
        ],
      },
    ],
  }
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockOnceIf('/api/assessments/2', JSON.stringify(sampleAssessment))
    fetchMock.mockOnceIf('/api/assessments/2/submissions/', JSON.stringify({ score: 1337010 }))
    vi.mock('../settings/useSettings', () => ({
      useSettings: () => fallbackSettings,
    }))
  })

  it('submits chosen input', async () => {
    renderWithRouter(<App />, '/assessments/2')
    expect(fetch).toHaveBeenCalledWith('/api/assessments/2', expect.anything())

    await waitUntilSubmitButtonRendered()
    await userEvent.click(screen.getByLabelText(/cats/i))

    await userEvent.click(submitButton())
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(`/api/assessments/2/submissions/`, {
        method: 'POST',
        body: JSON.stringify({ '0': ['0'] }),
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      }),
    )
  })

  it('displays score returned from backend after submission', async () => {
    renderWithRouter(<App />, '/assessments/2')
    await waitUntilSubmitButtonRendered()
    await userEvent.click(submitButton())
    await waitFor(() => expect(screen.getByText(/1337010/)).toBeInTheDocument())
  })

  it('hides Submit button and Form after getting scoring results', async () => {
    renderWithRouter(<App />, '/assessments/2')
    await waitUntilSubmitButtonRendered()
    expect(screen.getByRole('checkbox', { name: /Cats/i })).toBeInTheDocument()
    await userEvent.click(submitButton())
    expect(screen.queryByRole('button', { name: /test absenden/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: /Cats/i })).not.toBeInTheDocument()
  })

  it('navigates to assessments list when cancel button was clicked', async () => {
    renderWithRouter(<App />, '/assessments/2')
    await waitUntilSubmitButtonRendered()
    await userEvent.click(cancelButton())
    expect(screen.queryByRole('button', { name: /test absenden/i })).not.toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith('/api/assessments/', expect.anything())
  })

  it('navigates to assessments list when "assessment overview" button was clicked', async () => {
    renderWithRouter(<App />, '/assessments/2')
    await waitUntilSubmitButtonRendered()
    await userEvent.click(submitButton())
    await userEvent.click(assessmentListButton())

    expect(fetch).toHaveBeenCalledWith('/api/assessments/', expect.anything())
  })
})

const waitUntilSubmitButtonRendered = async () =>
  await waitFor(() => expect(submitButton()).toBeInTheDocument())
const submitButton = () => button(/test absenden/i)
const cancelButton = () => button(/abbrechen/i)
const assessmentListButton = () => button(/testübersicht/i)

const button = (name: RegExp) => screen.getByRole('button', { name })
