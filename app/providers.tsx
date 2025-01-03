'use client'

import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

interface Props {
  session: Session | null
  children: React.ReactNode
  messages: AbstractIntlMessages
  locale: string
}

export default function Providers({ session, children, messages, locale }: Props) {
  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  )
}
