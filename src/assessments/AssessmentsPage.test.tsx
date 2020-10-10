import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { mocked } from 'ts-jest/utils'
import { AssessmentsPage } from './AssessmentsPage'
import { getAssessmentById, scoreAssessment } from './assessmentsService'
import { Assessment } from './models'
import userEvent from '@testing-library/user-event'

jest.mock('./assessmentsService')

describe('AssessmentsPage', () => {
  beforeEach(() => {
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
    mocked(getAssessmentById).mockResolvedValue(sampleAssessment)
    mocked(scoreAssessment).mockResolvedValue({ score: 0 })
  })

  afterEach(() => {
    mocked(getAssessmentById).mockClear()
    mocked(scoreAssessment).mockClear()
  })

  it('renders only first assessment item initially', async () => {
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
    render(<AssessmentsPage />)
    await waitFor(() => expect(getAssessmentById).toHaveBeenCalled())
    userEvent.click(nextButton())

    expect(
      screen.getByRole('heading', { name: /which buffy character is the best[?]/i }),
    ).toBeInTheDocument()
  })

  it('hides Next button on last item', async () => {
    render(<AssessmentsPage />)
    await waitFor(() => expect(getAssessmentById).toHaveBeenCalled())

    userEvent.click(nextButton())

    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
  })

  it('submits chosen input', async () => {
    render(<AssessmentsPage />)
    await waitFor(() => expect(getAssessmentById).toHaveBeenCalled())

    userEvent.click(screen.getByLabelText(/cats/i))
    userEvent.click(nextButton())

    userEvent.click(screen.getByLabelText(/xander/i))
    userEvent.click(submitButton())

    await waitFor(() => expect(scoreAssessment).toHaveBeenCalledTimes(1))
    expect(scoreAssessment).toHaveBeenCalledWith('1', {
      '0': ['0'],
      '1': ['2'],
    })
  })
  it('displays score returned from backend after submission', async () => {
    const mockedScore = 12345
    mocked(scoreAssessment).mockResolvedValue({ score: mockedScore })
    render(<AssessmentsPage />)
    await waitFor(() => expect(getAssessmentById).toHaveBeenCalled())
    userEvent.click(nextButton())

    userEvent.click(submitButton())
    await waitFor(() => expect(scoreAssessment).toHaveBeenCalledTimes(1))

    expect(screen.getByText(new RegExp(mockedScore.toString()))).toBeInTheDocument()
  })
  it('hides Submit button and Form after getting scoring results', async () => {
    render(<AssessmentsPage />)
    await waitFor(() => expect(getAssessmentById).toHaveBeenCalled())
    userEvent.click(nextButton())

    userEvent.click(submitButton())
    await waitFor(() => expect(scoreAssessment).toHaveBeenCalledTimes(1))

    expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /which buffy character is the best[?]/i }),
    ).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/xander/i)).not.toBeInTheDocument()
  })
})

const nextButton = () => button(/next/i)
const submitButton = () => button(/submit/i)
const button = (name: RegExp) => screen.getByRole('button', { name })
