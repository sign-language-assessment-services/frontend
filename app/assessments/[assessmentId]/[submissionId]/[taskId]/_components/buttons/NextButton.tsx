import Button from '@/components/button/Button'
import { getTranslations } from 'next-intl/server'

interface Props {
  disabled?: boolean
}

export default async function NextButton({ disabled }: Props) {
  const t = await getTranslations('Buttons')
  return (
    <Button type="submit" form="task-form" icon="next" iconPosition="right" disabled={disabled}>
      {t('next')}
    </Button>
  )
}
