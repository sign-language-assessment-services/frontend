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
        'px-3',
        'py-1.5',
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
  const isTeacher = session?.user?.roles?.includes('test-scorer') ?? false

  return (
    <nav className={cx('flex', 'items-center', 'gap-6')}>
      <NavLink href="/assessments" activePaths={['/assessments']}>
        {t('assessments')}
      </NavLink>
      <NavLink href="/submissions" activePaths={['/submissions']}>
        {t('myResults')}
      </NavLink>
      {isTeacher && (
        <NavLink href="/teacher/assessments" activePaths={['/teacher/assessments']}>
          {t('teacherSubmissions')}
        </NavLink>
      )}
    </nav>
  )
}
