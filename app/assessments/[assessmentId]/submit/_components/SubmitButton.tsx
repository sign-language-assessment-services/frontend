import Button from '@/components/button/Button'
import { getTranslations } from 'next-intl/server'

interface Props {
  formId: string
  disabled?: boolean
}

export default async function SubmitButton({ formId, disabled }: Props) {
  const t = await getTranslations('Buttons')
  return (
    <Button type="submit" form={formId} style="SUCCESS" disabled={disabled}>
      {t('submit')}
    </Button>
  )
}
