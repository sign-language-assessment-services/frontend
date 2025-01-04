'use client'

import { Button } from '@/components/button/Button'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface Props {
  previousPageUrl: string | undefined
  disabled?: boolean
}

export default function BackButton({ previousPageUrl, disabled }: Props) {
  const t = useTranslations('Buttons')
  const router = useRouter()
  return (
    <Button
      onClick={() => router.push(previousPageUrl!)}
      disabled={disabled}
      icon="prev"
      iconPosition="left"
    >
      {t('back')}
    </Button>
  )
}
