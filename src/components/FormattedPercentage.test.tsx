import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { FormattedPercentage } from './FormattedPercentage'

describe('FormattedPercentage', () => {
  describe('formats percentage according to locale', () => {
    it.each([
      ['de-DE', 0, '0 %'],
      ['de-DE', 0.5, '50 %'],
      ['de-DE', 0.674, '67 %'],
      ['de-DE', 0.678, '68 %'],
      ['de-CH', 1, '100%'],
      ['en-US', 1, '100%'],
      ['mni', 1, '১০০%'],
      ['tr-TR', 1, '%100'],
    ])('[%s] %d -> %s', async (locale, percentage, expected) => {
      renderWithIntlProvider(percentage, locale)
      expect(screen.getByText(expected)).toBeInTheDocument()
    })
  })
})

const renderWithIntlProvider = (percentage: number, locale: string) =>
  render(
    <IntlProvider locale={locale}>
      <FormattedPercentage value={percentage} />
    </IntlProvider>,
  )
