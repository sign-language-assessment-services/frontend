import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function LoggedOutPage() {
  const t = await getTranslations('LoggedOut')

  return (
    <>
      <p>{t('message')}</p>
      <Link href="/">{t('signInAgain')}</Link>
    </>
  )
}
