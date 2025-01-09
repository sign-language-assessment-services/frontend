import { getFormatter } from 'next-intl/server'

interface Props {
  value: number
}

export default async function FormattedPercentage({ value }: Props) {
  const formatter = await getFormatter()
  const formattedNumber = formatter.number(value, { style: 'percent' })
  return <>{formattedNumber}</>
}
