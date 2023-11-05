import React from 'react'
import { FormattedNumber } from 'react-intl'

interface Props {
  value: number
}

export const FormattedPercentage: React.FC<Props> = ({ value }) => (
  <FormattedNumber value={value} style="percent" />
)
