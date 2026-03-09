import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function LoggedOutPage() {
  const t = await getTranslations('LoggedOut')

  return (
    <div className="w-full max-w-sm rounded-xl bg-white shadow-md border border-slate-200 p-6 text-center">
      <p className="text-slate-700 text-lg mb-5">{t('message')}</p>
      <Link
        href="/"
        className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        {t('signInAgain')}
      </Link>
    </div>
  )
}
