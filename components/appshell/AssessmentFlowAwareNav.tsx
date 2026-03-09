'use client'

import cx from 'classnames'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

function isInAssessmentFlow(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean)
  return (
    segments[0] === 'assessments' &&
    segments.length >= 4 &&
    Boolean(segments[1]) &&
    Boolean(segments[2])
  )
}

export default function AssessmentFlowAwareNav({ children }: PropsWithChildren) {
  const pathname = usePathname()
  if (isInAssessmentFlow(pathname) || pathname === '/logged-out') {
    return null
  }
  return (
    <div
      className={cx(
        'flex',
        'justify-between',
        'items-stretch',
        'h-10',
        'px-4',
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
