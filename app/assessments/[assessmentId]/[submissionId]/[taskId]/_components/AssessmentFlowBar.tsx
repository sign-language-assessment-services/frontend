'use client'

import { useTranslations } from 'next-intl'
import CloseButton from './buttons/CloseButton'

interface Props {
  assessmentName: string
  current: number
  total: number
  confirmLeave?: boolean
}

export default function AssessmentFlowBar({
  assessmentName,
  current,
  total,
  confirmLeave = true,
}: Props) {
  const t = useTranslations('Assessment')
  const progressPercent = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="flex-shrink-0 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <span className="text-sm font-medium text-slate-900 truncate" title={assessmentName}>
            {assessmentName}
          </span>
          <span className="text-sm text-slate-600 tabular-nums flex-shrink-0">
            {t('page', { current, total })}
          </span>
        </div>
        <CloseButton confirmLeave={confirmLeave} />
      </div>
      <div
        className="h-0.5 w-full bg-slate-200"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={t('page', { current, total })}
      >
        <div
          className="h-full bg-blue-500 transition-[width] duration-200"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}
