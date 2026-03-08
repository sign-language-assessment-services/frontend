'use client'

import cx from 'classnames'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

function isInAssessmentFlow(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean)
  return (
    segments[0] === 'assessments' &&
    segments.length >= 4 &&
    segments[1] &&
    segments[2]
  )
}

export default function AssessmentFlowAwareNav({ children }: PropsWithChildren) {
  const pathname = usePathname()
  if (isInAssessmentFlow(pathname)) {
    return null
  }
  return (
    <div
      className={cx(
        'flex',
        'justify-between',
        'items-center',
        'h-10',
        'px-6',
        'bg-blue-50',
        'text-sm',
        'border-b',
        'border-blue-200',
      )}
    >
      {children}
    </div>
  )
}
