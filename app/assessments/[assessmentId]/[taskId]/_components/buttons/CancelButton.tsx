'use client'

import { Button } from '@/components/button/Button'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface Props {
  disabled?: boolean
}

export default function CancelButton({ disabled }: Props) {
  const t = useTranslations('Buttons')
  const router = useRouter()
  return (
    <Button onClick={() => router.push(`/assessments`)} style="WARNING" disabled={disabled}>
      {t('cancel')}
    </Button>
  )
}
