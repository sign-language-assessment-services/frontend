import React from 'react'
import { describe, expect, it } from 'vitest'
import { FormattedDateTime } from './FormattedDateTime'
import { render, screen } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

describe('FormattedDateTime', () => {
  describe('supports timezone', () => {
    it('UTC', async () => {
      renderWithIntlProvider('2000-01-31T12:00:00Z', 'de-CH', 'UTC')
      expect(screen.getByText('31.01.00, 12:00')).toBeInTheDocument()
    })

    it('Europe/Zurich (UTC+1)', async () => {
      renderWithIntlProvider('2000-01-31T12:00:00Z', 'de-CH', 'Europe/Berlin')
      expect(screen.getByText('31.01.00, 13:00')).toBeInTheDocument()
    })

    it('America/Los_Angeles (UTC-8)', async () => {
      renderWithIntlProvider('2000-01-31T12:00:00Z', 'de-CH', 'America/Los_Angeles')
      expect(screen.getByText('31.01.00, 04:00')).toBeInTheDocument()
    })

    it('Asia/Tokyo (UTC+9)', async () => {
      renderWithIntlProvider('2000-01-31T12:00:00Z', 'de-CH', 'Asia/Tokyo')
      expect(screen.getByText('31.01.00, 21:00')).toBeInTheDocument()
    })
  })

  describe('supports locale', () => {
    it('Swiss German', async () => {
      renderWithIntlProvider('2000-01-31T12:00:00Z', 'de-CH', 'UTC')
      expect(screen.getByText('31.01.00, 12:00')).toBeInTheDocument()
    })

    it('American English', async () => {
      renderWithIntlProvider('2000-01-31T12:00:00Z', 'en-US', 'UTC')
      expect(screen.getByText('1/31/00, 12:00 PM')).toBeInTheDocument()
    })

    it('Japanese', async () => {
      renderWithIntlProvider('2000-01-31T12:00:00Z', 'ja-JP', 'UTC')
      expect(screen.getByText('2000/01/31 12:00')).toBeInTheDocument()
    })
  })
})

const renderWithIntlProvider = (datetime: string, locale: string, timeZone: string) =>
  render(
    <IntlProvider locale={locale} timeZone={timeZone}>
      <FormattedDateTime value={datetime} />
    </IntlProvider>,
  )
