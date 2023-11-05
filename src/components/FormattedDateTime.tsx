import React from 'react'
import { FormattedDate } from 'react-intl'

interface Props {
  value: string
}

export const FormattedDateTime: React.FC<Props> = ({ value }) => (
  <FormattedDate value={value} dateStyle="short" timeStyle="short" />
)
