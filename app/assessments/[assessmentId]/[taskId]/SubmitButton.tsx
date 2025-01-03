import { Button } from '@/components/Button'
import { getTranslations } from 'next-intl/server'

export default async function SubmitButton() {
  const t = await getTranslations('Buttons')
  return (
    <Button type="submit" form="assessment-item">
      {t('submit')}
    </Button>
  )
}
