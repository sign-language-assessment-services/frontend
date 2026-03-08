'use client'

interface Props {
  value: string
}

export default function FormattedDateTime({ value }: Props) {
  return (
    <>
      {new Date(value).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
    </>
  )
}
