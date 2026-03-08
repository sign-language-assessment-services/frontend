'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FiX } from 'react-icons/fi'
import { ConfirmModal } from '@/components/modals/ConfirmModal'

export default function CloseButton() {
  const t = useTranslations('Buttons')
  const tLeave = useTranslations('LeaveTest')
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 text-sm text-blue-900 font-medium hover:underline focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 rounded px-2 py-1 cursor-pointer"
      >
        <FiX className="w-5 h-5 flex-shrink-0" aria-hidden />
        <span>{t('cancel')}</span>
      </button>
      {showConfirm && (
        <ConfirmModal
          title={tLeave('confirmTitle')}
          message={tLeave('confirmMessage')}
          primaryLabel={tLeave('stay')}
          secondaryLabel={tLeave('leave')}
          onPrimary={() => setShowConfirm(false)}
          onSecondary={() => router.push('/assessments')}
          secondaryDanger
        />
      )}
    </>
  )
}
