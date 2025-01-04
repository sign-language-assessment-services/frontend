import './globals.css'
import { auth } from '@/lib/auth'
import Providers from '@/app/providers'
import { AppShell } from '@/components/appshell/AppShell'
import { getLocale, getMessages } from 'next-intl/server'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const messages = await getMessages()
  const locale = await getLocale()
  return (
    <html lang="en">
      <body>
        <Providers session={session} messages={messages} locale={locale}>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}
