'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FiX } from 'react-icons/fi'
import cx from 'classnames'

export default function CloseButton() {
  const t = useTranslations('Buttons')
  const router = useRouter()
  return (
    <div
      className={cx(
        'absolute',
        'right-4',
        'top-16',
        'hover:cursor-pointer',
        'hover:drop-shadow-md',
      )}
    >
      <FiX title={t('cancel')} onClick={() => router.push('/assessments')} />
    </div>
  )
}
