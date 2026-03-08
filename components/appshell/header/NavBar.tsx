'use client'

import cx from 'classnames'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

function NavLink({
  href,
  activePaths,
  children,
}: {
  href: string
  activePaths: string[]
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = activePaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  return (
    <a
      href={href}
      className={cx(
        'flex',
        'items-center',
        'h-full',
        'px-3',
        'transition-colors',
        isActive
          ? 'bg-blue-200 font-semibold text-slate-800'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 hover:underline underline-offset-2',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  )
}

export default function NavBar() {
  const { data: session } = useSession()
  const t = useTranslations('Navigation')
  const isTestTaker = session?.user?.roles?.includes('test-taker') ?? false
  const isTeacher = session?.user?.roles?.includes('test-scorer') ?? false

  return (
    <nav className={cx('flex', 'items-center', 'h-full', 'gap-6')}>
      <NavLink href="/assessments" activePaths={['/assessments']}>
        {t('assessments')}
      </NavLink>
      {isTestTaker && (
        <NavLink href="/submissions" activePaths={['/submissions']}>
          {t('myResults')}
        </NavLink>
      )}
      {isTeacher && (
        <NavLink href="/teacher/assessments" activePaths={['/teacher/assessments']}>
          {t('teacherSubmissions')}
        </NavLink>
      )}
    </nav>
  )
}
