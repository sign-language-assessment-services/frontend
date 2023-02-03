import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { AssessmentsForm } from './AssessmentsForm'
import { describe, expect, it, vi } from 'vitest'
import { Item } from './models'

describe('AssessmentsForm', () => {
  const sampleItems: Item[] = [
    {
      description: 'Who is better?',
      choices: [{ label: 'Cats' }, { label: 'Dogs' }],
    },
    {
      description: 'Which Buffy character is the best?',
      choices: [{ label: 'Giles' }, { label: 'Spike' }, { label: 'Xander' }],
    },
  ]

  const onSubmit = vi.fn()

  const renderComponent = () => render(<AssessmentsForm items={sampleItems} onSubmit={onSubmit} />)

  it('renders only first assessment item initially', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()
    expect(screen.getByRole('heading', { name: /who is better[?]/i })).toBeInTheDocument()
    expect(screen.getByText(/cats/i)).toBeInTheDocument()
    expect(screen.getByText(/dogs/i)).toBeInTheDocument()

    expect(
      screen.queryByRole('heading', { name: /which buffy character is the best[?]/i }),
    ).not.toBeInTheDocument()
  })

  it('renders next assessment after clicking on Next', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()
    await userEvent.click(nextButton())
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /which buffy character is the best[?]/i }),
      ).toBeInTheDocument(),
    )
  })

  it('hides Next button on last item', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()

    await userEvent.click(nextButton())
    await waitUntilSubmitButtonRendered()

    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
  })

  it('submits chosen input', async () => {
    renderComponent()

    await waitUntilNextButtonRendered()

    await userEvent.click(screen.getByLabelText(/cats/i))
    await userEvent.click(nextButton())
    await waitUntilSubmitButtonRendered()

    await userEvent.click(screen.getByLabelText(/xander/i))
    await userEvent.click(submitButton())
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit).toHaveBeenCalledWith({
      '0': ['0'],
      '1': ['2'],
    })
  })
})

const waitUntilNextButtonRendered = async () =>
  await waitFor(() => expect(nextButton()).toBeInTheDocument())

const waitUntilSubmitButtonRendered = async () =>
  await waitFor(() => expect(submitButton()).toBeInTheDocument())

const nextButton = () => button(/next/i)
const submitButton = () => button(/submit/i)
const button = (name: RegExp) => screen.getByRole('button', { name })
