import Button from '@/components/button/Button'
import { getTranslations } from 'next-intl/server'

interface Props {
  disabled?: boolean
}

export default async function SubmitButton({ disabled }: Props) {
  const t = await getTranslations('Buttons')
  return (
    <Button type="submit" form="assessment-submit" style="SUCCESS" disabled={disabled}>
      {t('submit')}
    </Button>
  )
}
