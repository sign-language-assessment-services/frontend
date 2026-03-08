'use client'

import cx from 'classnames'
import AssessmentSummary from '@/lib/models'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

function PlaceholderImage() {
  return (
    <div
      className={cx(
        'w-full aspect-[3/2] bg-slate-100 flex items-center justify-center',
        'border-b border-slate-200',
      )}
      aria-hidden
    >
      <svg
        className="w-16 h-16 text-slate-300"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.2}
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
  )
}

export default function AssessmentSummaryComponent({
  assessment,
  isTestTaker,
}: {
  assessment: AssessmentSummary
  isTestTaker: boolean
}) {
  const t = useTranslations('Assessments')
  const url = `/assessments/${assessment.id}`

  return (
    <article className={cx('border border-slate-200 bg-white overflow-hidden')}>
      <Link href={url} className={cx('block group')}>
        <PlaceholderImage />
        <div className={cx('p-4')}>
          <h2 className={cx('font-semibold text-slate-900 mb-3')}>{assessment.name}</h2>
          <span
            className={cx(
              'inline-flex items-center gap-2 text-sm font-medium text-blue-600',
              'group-hover:underline',
            )}
          >
            {isTestTaker ? t('startTest') : t('viewTest')}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
