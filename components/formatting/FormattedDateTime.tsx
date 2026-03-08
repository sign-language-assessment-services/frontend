'use client'

interface Props {
  value: string
}

export default function FormattedDateTime({ value }: Props) {
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(Date.parse(value))
  return <>{formattedDate}</>
}
