'use client'

import { Button } from '@/components/Button'
import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function CancelButton() {
  const t = useTranslations('Buttons')
  return (
    <Button onClick={() => redirect(`/assessments`)} style="WARNING">
      {t('cancel')}
    </Button>
  )
}
