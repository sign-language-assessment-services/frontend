'use client'

import { Button } from '@/components/Button'
import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface Props {
  previousPageUrl: string | undefined
}

export default function BackButton({ previousPageUrl }: Props) {
  const t = useTranslations('Buttons')
  return (
    <Button
      onClick={() => redirect(previousPageUrl!)}
      disabled={previousPageUrl === undefined}
      icon="prev"
      iconPosition="left"
    >
      {t('back')}
    </Button>
  )
}
