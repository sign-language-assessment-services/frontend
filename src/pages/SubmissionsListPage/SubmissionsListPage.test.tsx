import { screen, waitFor } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithRouter } from '../../testutils/renderWithRouter'
import { Submission } from './models/submission'
import { SubmissionsListPage } from './SubmissionsListPage'

const CURRENT_USER_ID = 'test-taker-1'

describe('SubmissionsListPage', () => {
  const sampleSubmissions: Submission[] = [
    {
      id: 'submission-1',
      user_id: CURRENT_USER_ID,
      assessment_id: 'assessment-1',
      answers: {
        '1': [],
        '2': [0, 1],
      },
      score: 42001,
    },
  ]

  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockOnceIf(
      `/api/submissions/?user_id=${CURRENT_USER_ID}`,
      JSON.stringify(sampleSubmissions),
    )

    vi.mock('../../auth/useAuthentication', () => {
      return {
        useAuthentication: () => ({
          user: { id: CURRENT_USER_ID },
        }),
      }
    })
  })

  it('displays submissions', async () => {
    renderWithRouter(<SubmissionsListPage />, '/submissions/')
    await waitUntilDataWasFetched(CURRENT_USER_ID)
    expect(screen.getAllByRole('heading', { name: /Meine Ergebnisse/i }).length).toBeGreaterThan(0)

    expect(screen.getByRole('columnheader', { name: 'Test' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Punkte' })).toBeInTheDocument()

    expect(screen.getByRole('cell', { name: 'assessment-1' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '42001' })).toBeInTheDocument()
  })
})
const waitUntilDataWasFetched = async (userId: string) =>
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(`/api/submissions/?user_id=${userId}`, {
      headers: expect.anything(),
    }),
  )
