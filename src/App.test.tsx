import { screen } from '@testing-library/react'
import React from 'react'
import { App } from './App'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fallbackSettings } from './settings/Settings'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from './testutils/renderWithRouter'

describe('App', () => {
  beforeEach(() => {
    // Mock sub-components so that we can assert they are rendered without retesting their internals
    vi.mock('./pages/AssessmentsPage', () => ({
      AssessmentsPage: function AssessmentsPage() {
        return <span data-testid="AssessmentsPage" />
      },
    }))

    vi.mock('./pages/AssessmentsListPage', () => ({
      AssessmentsListPage: function AssessmentsListPage() {
        return <span data-testid="AssessmentsListPage" />
      },
    }))

    vi.mock('./pages/SubmissionsListPage', () => ({
      SubmissionsListPage: function SubmissionsListPage() {
        return <span data-testid="SubmissionsListPage" />
      },
    }))

    vi.mock('./settings/useSettings', () => ({
      useSettings: () => fallbackSettings,
    }))
  })

  describe('Assessments page', () => {
    it('renders Assessments for route /assessments/1', () => {
      renderApp('/assessments/1')
      expect(screen.getByTestId('AssessmentsPage')).toBeInTheDocument()
    })
  })

  describe('Assessments list page', () => {
    it.each(['/', '/assessments'])('renders for route: %s', (route: string) => {
      renderApp(route)
      expect(screen.getByTestId('AssessmentsListPage')).toBeInTheDocument()
    })
  })

  describe('Submissions list page', () => {
    it('renders for route /submissions', () => {
      renderApp('/submissions')
      expect(screen.getByTestId('SubmissionsListPage')).toBeInTheDocument()
    })
  })

  describe('"Not Found" page', () => {
    beforeEach(() => {
      renderApp('/unknown-route')
    })

    it('renders Not Found page if route is unknown', () => {
      expect(screen.getByRole('heading', { name: /seite nicht gefunden/i })).toBeInTheDocument()
      expect(screen.queryByTestId('AssessmentsPage')).not.toBeInTheDocument()
    })

    it('redirects to assessments list page when clicking "back to home page" button', async () => {
      await userEvent.click(screen.getByRole('button', { name: /zur startseite/i }))

      expect(screen.getByTestId('AssessmentsListPage')).toBeInTheDocument()
      expect(
        screen.queryByRole('heading', { name: /seite nicht gefunden/i }),
      ).not.toBeInTheDocument()
    })
  })
})

const renderApp = (route = '/') => renderWithRouter(<App />, route)
