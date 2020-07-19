import React from 'react'
import { render, screen, wait } from '@testing-library/react'
import { getAssessmentById } from './assessmentsService'
import { mocked } from 'ts-jest/utils'
import { AssessmentsPage } from './AssessmentsPage'
import { Assessment } from './models'

jest.mock('./assessmentsService')

describe('AssessmentsPage', () => {
  it('renders assessment', async () => {
    const sampleAssessment: Assessment = {
      name: 'Animals',
      items: [
        {
          description: 'Who is better?',
          choices: [
            { label: 'Cats', is_correct: true },
            { label: 'Dogs', is_correct: false },
          ],
        },
      ],
    }
    mocked(getAssessmentById).mockResolvedValue(sampleAssessment)

    // when
    render(<AssessmentsPage />)

    // then
    await wait(() => expect(getAssessmentById).toHaveBeenCalled())
    expect(screen.getByRole('heading', { name: 'Animals' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Who is better?' })).toBeInTheDocument()
    expect(screen.getByText('Cats')).toBeInTheDocument()
    expect(screen.getByText('Dogs')).toBeInTheDocument()
  })
})
