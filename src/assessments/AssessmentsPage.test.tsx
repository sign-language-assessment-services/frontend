import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { mocked } from 'ts-jest/utils'
import { AssessmentsPage } from './AssessmentsPage'
import { getAssessmentById } from './assessmentsService'
import { Assessment } from './models'
import userEvent from '@testing-library/user-event'

jest.mock('./assessmentsService')

describe('AssessmentsPage', () => {
  const sampleAssessment: Assessment = {
    name: 'Animals',
    items: [
      {
        description: 'Who is better?',
        choices: [{ label: 'Cats' }, { label: 'Dogs' }],
      },
      {
        description: 'Which Buffy character is the best?',
        choices: [{ label: 'Giles' }, { label: 'Spike' }, { label: 'Xander' }],
      },
    ],
  }

  it('renders only first assessment item initially', async () => {
    mocked(getAssessmentById).mockResolvedValue(sampleAssessment)

    // when
    render(<AssessmentsPage />)

    // then
    await waitFor(() => expect(getAssessmentById).toHaveBeenCalled())
    expect(screen.getByRole('heading', { name: /animals/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /who is better[?]/i })).toBeInTheDocument()
    expect(screen.getByText(/cats/i)).toBeInTheDocument()
    expect(screen.getByText(/dogs/i)).toBeInTheDocument()

    expect(
      screen.queryByRole('heading', { name: /which buffy character is the best[?]/i }),
    ).not.toBeInTheDocument()
  })

  it('renders next assessment after clicking on Next', async () => {
    mocked(getAssessmentById).mockResolvedValue(sampleAssessment)
    render(<AssessmentsPage />)
    await waitFor(() => expect(getAssessmentById).toHaveBeenCalled())
    userEvent.click(screen.getByRole('button', { name: /next/i }))

    expect(
      screen.getByRole('heading', { name: /which buffy character is the best[?]/i }),
    ).toBeInTheDocument()
  })

  it('hides Next button on last item', async () => {
    mocked(getAssessmentById).mockResolvedValue(sampleAssessment)
    render(<AssessmentsPage />)
    await waitFor(() => expect(getAssessmentById).toHaveBeenCalled())

    const nextButton = screen.getByRole('button', { name: /next/i })
    userEvent.click(nextButton)

    expect(nextButton).not.toBeInTheDocument()
  })
})
