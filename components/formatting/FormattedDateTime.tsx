import React from 'react'
import { getFormatter } from 'next-intl/server'

interface Props {
  value: string
}

export default async function FormattedDateTime({ value }: Props) {
  const formatter = await getFormatter()
  const formattedDate = formatter.dateTime(Date.parse(value), {
    dateStyle: 'short',
    timeStyle: 'short',
  })
  return <>{formattedDate}</>
}
