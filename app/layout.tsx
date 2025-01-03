import './globals.css'
import { getSession } from '@/lib/auth'
import Providers from '@/app/providers'
import { PageContainer } from '@/components/layout/PageContainer'
import { getLocale, getMessages } from 'next-intl/server'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()
  const messages = await getMessages()
  const locale = await getLocale()
  return (
    <html lang="en">
      <body>
        <Providers session={session} messages={messages} locale={locale}>
          <PageContainer>{children}</PageContainer>
        </Providers>
      </body>
    </html>
  )
}
