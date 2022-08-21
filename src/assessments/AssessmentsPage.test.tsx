import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { AssessmentsPage } from './AssessmentsPage'
import { getAssessmentById, scoreAssessment } from './assessmentsService'
import { Assessment } from './models'

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
    jest.mocked(getAssessmentById).mockResolvedValue(sampleAssessment)
    jest.mocked(scoreAssessment).mockResolvedValue({ score: 0 })
  })

  it('renders only first assessment item initially', async () => {
    // when
    render(<AssessmentsPage />)

    // then
    await waitUntilNextButtonRendered()
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
    await waitUntilNextButtonRendered()

    userEvent.click(nextButton())
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /which buffy character is the best[?]/i }),
      ).toBeInTheDocument(),
    )
  })

  it('hides Next button on last item', async () => {
    render(<AssessmentsPage />)
    await waitUntilNextButtonRendered()

    userEvent.click(nextButton())
    await waitUntilSubmitButtonRendered()

    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
  })

  it('submits chosen input', async () => {
    render(<AssessmentsPage />)
    await waitUntilNextButtonRendered()

    userEvent.click(screen.getByLabelText(/cats/i))
    userEvent.click(nextButton())
    await waitUntilSubmitButtonRendered()

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
    jest.mocked(scoreAssessment).mockResolvedValue({ score: mockedScore })
    render(<AssessmentsPage />)
    await waitUntilNextButtonRendered()

    userEvent.click(nextButton())
    await waitUntilSubmitButtonRendered()

    userEvent.click(submitButton())
    await waitFor(() => expect(scoreAssessment).toHaveBeenCalledTimes(1))
    expect(screen.getByText(new RegExp(mockedScore.toString()))).toBeInTheDocument()
  })

  it('hides Submit button and Form after getting scoring results', async () => {
    render(<AssessmentsPage />)
    await waitUntilNextButtonRendered()

    userEvent.click(nextButton())
    await waitUntilSubmitButtonRendered()

    userEvent.click(submitButton())
    await waitFor(() => expect(scoreAssessment).toHaveBeenCalledTimes(1))

    expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /which buffy character is the best[?]/i }),
    ).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/xander/i)).not.toBeInTheDocument()
  })
})

const waitUntilNextButtonRendered = async () =>
  await waitFor(() => expect(nextButton()).toBeInTheDocument())

const waitUntilSubmitButtonRendered = async () =>
  await waitFor(() => expect(submitButton()).toBeInTheDocument())

const nextButton = () => button(/next/i)
const submitButton = () => button(/submit/i)
const button = (name: RegExp) => screen.getByRole('button', { name })
