import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fallbackSettings } from '../../settings/Settings'
import AssessmentSummary from './models/AssessmentSummary'
import { renderWithRouter } from '../../testutils/renderWithRouter'
import { App } from '../../App'

describe('AssessmentsListPage', () => {
  const sampleAssessmentSummaries: AssessmentSummary[] = [
    {
      id: 1,
      name: 'Animals',
    },
    {
      id: 2,
      name: 'Plants',
    },
  ]

  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockOnceIf('/api/assessments/', JSON.stringify(sampleAssessmentSummaries))
    vi.mock('../settings/useSettings', () => ({
      useSettings: () => fallbackSettings,
    }))
  })

  it('displays assessments', async () => {
    renderWithRouter(<App />, '/assessments/')
    await waitUntilDataWasFetched()
    expect(screen.getAllByRole('heading', { name: /Tests/i }).length).toBeGreaterThan(0)
    expect(screen.getByText('Animals')).toBeInTheDocument()
    expect(screen.getByText('Plants')).toBeInTheDocument()
  })

  it('navigates to assessment page when clicking on an assessment name', async () => {
    // Given
    renderWithRouter(<App />, '/assessments/')
    await waitUntilDataWasFetched()
    const plantsRow = await screen.getByRole('cell', { name: 'Plants' })

    // When
    await userEvent.click(plantsRow)

    // Then
    expect(screen.queryByRole('cell', { name: 'Plants' })).not.toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith('/api/assessments/2', { headers: expect.anything() })
  })
})

const waitUntilDataWasFetched = async () =>
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(`/api/assessments/`, {
      headers: expect.anything(),
    }),
  )
