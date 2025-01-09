'use client'

import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import cx from 'classnames'

export default function SignOutLink() {
  const t = useTranslations('UserPanel')
  return (
    <a
      className={cx('font-bold', 'text-xs', 'md:text-sm', 'hover:drop-shadow-lg')}
      href="#"
      onClick={async () => {
        await signOut()
      }}
    >
      {t('signOut')}
    </a>
  )
}
