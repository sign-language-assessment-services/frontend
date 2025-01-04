'use client'

import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'

export default function SignOutLink() {
  const t = useTranslations('UserPanel')
  return (
    <a
      className="font-bold text-xs md:text-sm hover:drop-shadow-lg"
      href="#"
      onClick={async () => {
        await signOut()
      }}
    >
      {t('signOut')}
    </a>
  )
}
