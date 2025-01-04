import './globals.css'
import { auth } from '@/lib/auth'
import Providers from '@/app/providers'
import { AppShell } from '@/components/appshell/AppShell'
import { getLocale, getMessages, getTimeZone } from 'next-intl/server'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const messages = await getMessages()
  const locale = await getLocale()
  const timeZone = await getTimeZone()
  return (
    <html lang={locale}>
      <body>
        <Providers session={session} messages={messages} locale={locale} timeZone={timeZone}>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}
