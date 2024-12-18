import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fallbackSettings } from '../../settings/Settings'
import { renderWithRouter } from '../../testutils/renderWithRouter'
import { App } from '../../App'
import { Assessment } from './models/assessment'
import { ScoringResult } from './models/scoringResult'
import fetchMock from '@fetch-mock/vitest'

describe('AssessmentsPage', () => {
  const sampleAssessment: Assessment = {
    name: 'Animals',
    items: [
      {
        position: 0,
        question: { url: 'https://question.video.example.com', type: 'video' },
        choices: [
          { type: 'video', url: 'https://choice1.video.example.com' },
          { type: 'video', url: 'https://choice2.video.example.com' },
          { type: 'video', url: 'https://choice3.video.example.com' },
        ],
      },
    ],
  }
  const sampleScoringResult: ScoringResult = {
    points: 1337,
    maximum_points: 1500,
    percentage: 0.891,
  }

  beforeEach(() => {
    fetchMock.mockReset()
    fetchMock.route('/api/assessments/2', JSON.stringify(sampleAssessment))
    fetchMock.route('/api/assessments/2/submissions/', JSON.stringify(sampleScoringResult))
    vi.mock('../settings/useSettings', () => ({
      useSettings: () => fallbackSettings,
    }))
  })

  it('submits chosen input', async () => {
    renderWithRouter(<App />, '/assessments/2')
    expect(fetchMock.callHistory.called(`/api/assessments/2`)).toBeTruthy()

    await waitUntilSubmitButtonRendered()
    await userEvent.click(screen.getByLabelText(/antwort 1/i))

    await userEvent.click(submitButton())
    await waitFor(() =>
      expect(
        fetchMock.callHistory.called(`/api/assessments/2/submissions/`, {
          method: 'POST',
          body: { '0': ['0'] },
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        }),
      ),
    )
  })

  it('displays score returned from backend after submission', async () => {
    renderWithRouter(<App />, '/assessments/2')
    await waitUntilSubmitButtonRendered()
    await userEvent.click(submitButton())
    await waitFor(() => expect(screen.getByText(/1337\s*\/\s*1500/)).toBeInTheDocument())
    expect(screen.getByText(/\(89\s*%\)/)).toBeInTheDocument()
  })

  it('hides Submit button and Form after getting scoring results', async () => {
    renderWithRouter(<App />, '/assessments/2')
    await waitUntilSubmitButtonRendered()
    expect(screen.getByRole('checkbox', { name: /antwort 1/i })).toBeInTheDocument()
    await userEvent.click(submitButton())
    expect(screen.queryByRole('button', { name: /test absenden/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: /antwort 1/i })).not.toBeInTheDocument()
  })

  it('navigates to assessments list when cancel button was clicked', async () => {
    renderWithRouter(<App />, '/assessments/2')
    await waitUntilSubmitButtonRendered()
    await userEvent.click(cancelButton())
    expect(screen.queryByRole('button', { name: /test absenden/i })).not.toBeInTheDocument()
    expect(fetchMock.callHistory.called('/api/assessments/')).toBeTruthy()
  })

  it('navigates to assessments list when "assessment overview" button was clicked', async () => {
    renderWithRouter(<App />, '/assessments/2')
    await waitUntilSubmitButtonRendered()
    await userEvent.click(submitButton())
    await userEvent.click(assessmentListButton())

    expect(fetchMock.callHistory.called('/api/assessments/')).toBeTruthy()
  })
})

const waitUntilSubmitButtonRendered = async () =>
  await waitFor(() => expect(submitButton()).toBeInTheDocument())
const submitButton = () => button(/test absenden/i)
const cancelButton = () => button(/abbrechen/i)
const assessmentListButton = () => button(/testübersicht/i)

const button = (name: RegExp) => screen.getByRole('button', { name })
