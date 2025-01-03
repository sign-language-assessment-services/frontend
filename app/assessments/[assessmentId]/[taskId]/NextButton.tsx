'use client'

import { Button } from '@/components/Button'
import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface Props {
  nextPageUrl: string | undefined
}

export default function NextButton({ nextPageUrl }: Props) {
  const t = useTranslations('Buttons')
  return (
    <Button onClick={() => redirect(nextPageUrl!)} icon="next" iconPosition="right">
      {t('next')}
    </Button>
  )
}
