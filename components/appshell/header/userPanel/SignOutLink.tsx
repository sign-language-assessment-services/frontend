'use client'

import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import cx from 'classnames'

export default function SignOutLink() {
  const t = useTranslations('UserPanel')
  return (
    <a
      className={cx(
        'inline-block',
        'px-3',
        'py-1.5',
        'text-sm',
        'font-medium',
        'text-slate-700',
        'bg-slate-100',
        'hover:bg-slate-200',
        'transition-colors',
      )}
      href="#"
      onClick={async (e) => {
        e.preventDefault()
        await signOut()
      }}
    >
      {t('signOut')}
    </a>
  )
}
