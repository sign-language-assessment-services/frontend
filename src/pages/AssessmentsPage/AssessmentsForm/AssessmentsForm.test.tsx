import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { AssessmentsForm } from './AssessmentsForm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Assessment } from '../models'
import { fallbackSettings } from '../../../settings/Settings'

describe('AssessmentsForm', () => {
  beforeEach(() => {
    vi.mock('../settings/useSettings', () => ({
      useSettings: () => fallbackSettings,
    }))
  })

  const sampleAssessment: Assessment = {
    name: 'Animals',
    items: [
      {
        question: { text: 'Who is better?', type: 'text' },
        choices: [
          { type: 'text', text: 'Cats' },
          { type: 'text', text: 'Dogs' },
        ],
      },
      {
        question: { text: 'Which Buffy character is the best?', type: 'text' },
        choices: [
          { type: 'text', text: 'Giles' },
          { type: 'text', text: 'Spike' },
          { type: 'text', text: 'Xander' },
        ],
      },
      {
        question: { url: 'https://question.video.example.com', type: 'video' },
        choices: [
          { type: 'video', url: 'https://choice1.video.example.com' },
          { type: 'video', url: 'https://choice2.video.example.com' },
          { type: 'video', url: 'https://choice3.video.example.com' },
        ],
      },
    ],
  }
  const onSubmit = vi.fn()

  const renderComponent = () =>
    render(<AssessmentsForm assessment={sampleAssessment} onSubmit={onSubmit} />)

  it('renders only first assessment item initially', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()
    expect(screen.getByRole('heading', { name: /animals/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /who is better[?]/i })).toBeInTheDocument()
    expect(screen.getByText(/cats/i)).toBeInTheDocument()
    expect(screen.getByText(/dogs/i)).toBeInTheDocument()

    expect(
      screen.queryByRole('heading', { name: /which buffy character is the best[?]/i }),
    ).not.toBeInTheDocument()
  })

  it('renders next assessment item after clicking on Next', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()
    await userEvent.click(nextButton())
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /which buffy character is the best[?]/i }),
      ).toBeInTheDocument(),
    )
  })

  it('disables Next button on last item', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()

    await userEvent.click(nextButton())
    await userEvent.click(nextButton())
    await waitUntilSubmitButtonRendered()

    expect(nextButton()).toBeDisabled()
  })

  it('renders previous assessment item after clicking on Back', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()
    await userEvent.click(nextButton())
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /which buffy character is the best[?]/i }),
      ).toBeInTheDocument(),
    )

    await userEvent.click(backButton())

    expect(screen.getByRole('heading', { name: /who is better[?]/i })).toBeInTheDocument()
  })

  it('disables Back button on first item', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()

    await waitUntilSubmitButtonRendered()

    expect(backButton()).toBeDisabled()
  })

  it('submits chosen input', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()

    await userEvent.click(screen.getByLabelText(/cats/i))
    await userEvent.click(nextButton())

    await userEvent.click(screen.getByLabelText(/xander/i))
    await userEvent.click(nextButton())

    await userEvent.click(screen.getByLabelText('Antwort 2'))

    await waitUntilSubmitButtonRendered()
    await userEvent.click(submitButton())
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit).toHaveBeenCalledWith({
      '0': ['0'],
      '1': ['2'],
      '2': ['1'],
    })
  })

  it('renders video question and choices', async () => {
    const { container } = renderComponent()

    await waitUntilNextButtonRendered()
    await userEvent.click(nextButton())
    await userEvent.click(nextButton())

    const videos = container.querySelectorAll('video')
    expect(videos).toHaveLength(4)
    expect(videos[0].getAttribute('src')).toEqual('https://question.video.example.com')
    expect(videos[1].getAttribute('src')).toEqual('https://choice1.video.example.com')
    expect(videos[2].getAttribute('src')).toEqual('https://choice2.video.example.com')
    expect(videos[3].getAttribute('src')).toEqual('https://choice3.video.example.com')
  })
})

const waitUntilNextButtonRendered = async () =>
  await waitFor(() => expect(nextButton()).toBeInTheDocument())

const waitUntilSubmitButtonRendered = async () =>
  await waitFor(() => expect(submitButton()).toBeInTheDocument())

const nextButton = () => button(/weiter/i)
const backButton = () => button(/zurück/i)
const submitButton = () => button(/test absenden/i)
const button = (name: RegExp) => screen.getByRole('button', { name })
