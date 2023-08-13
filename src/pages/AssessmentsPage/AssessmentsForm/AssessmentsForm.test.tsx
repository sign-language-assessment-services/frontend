import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { AssessmentsForm } from './AssessmentsForm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fallbackSettings } from '../../../settings/Settings'
import { renderWithRouter } from '../../../testutils/renderWithRouter'
import { Assessment } from '../models/assessment'

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
        position: 0,
        content: { url: 'https://introduction.video.example.com', type: 'video' },
      },
      {
        position: 1,
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
    renderWithRouter(<AssessmentsForm assessment={sampleAssessment} onSubmit={onSubmit} />)

  it('renders static video item initially', async () => {
    const { container } = renderComponent()
    const videos = container.querySelectorAll('video')
    expect(videos).toHaveLength(1)
    expect(videos[0].getAttribute('src')).toEqual('https://introduction.video.example.com')

    await waitUntilNextButtonRendered()
  })

  it('renders video question and choices', async () => {
    const { container } = renderComponent()

    await waitUntilNextButtonRendered()
    await userEvent.click(nextButton())

    const videos = container.querySelectorAll('video')
    expect(videos).toHaveLength(4)
    expect(videos[0].getAttribute('src')).toEqual('https://question.video.example.com')
    expect(videos[1].getAttribute('src')).toEqual('https://choice1.video.example.com')
    expect(videos[2].getAttribute('src')).toEqual('https://choice2.video.example.com')
    expect(videos[3].getAttribute('src')).toEqual('https://choice3.video.example.com')
  })

  it('disables Next button on last item', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()

    await userEvent.click(nextButton())
    await waitUntilSubmitButtonRendered()

    expect(nextButton()).toBeDisabled()
  })

  it('renders previous assessment item after clicking on Back', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()
    await userEvent.click(nextButton())
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /seite 2/i })).toBeInTheDocument(),
    )

    await userEvent.click(backButton())

    expect(screen.getByRole('heading', { name: /seite 1/i })).toBeInTheDocument()
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

    await userEvent.click(nextButton())
    await waitUntilSubmitButtonRendered()

    await userEvent.click(screen.getByLabelText('Antwort 2'))

    await userEvent.click(submitButton())
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit).toHaveBeenCalledWith({
      '1': ['1'],
    })
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
