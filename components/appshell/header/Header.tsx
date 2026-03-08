import cx from 'classnames'
import { PropsWithChildren } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface HeaderProps extends PropsWithChildren {
  breadcrumbs?: BreadcrumbItem[]
}

export default function Header({ children, breadcrumbs }: HeaderProps) {
  return (
    <header
      className={cx(
        'flex',
        'items-center',
        'h-12',
        'px-6',
        'bg-blue-100',
        'text-sm',
        'border-b-4',
        'border-blue-200',
      )}
    >
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav aria-label="Breadcrumb" className={cx('flex', 'items-center', 'gap-2', 'text-slate-600')}>
          {breadcrumbs.map((item, i) => (
            <span key={i} className={cx('flex', 'items-center', 'gap-2')}>
              {i > 0 && <span className={cx('text-slate-400')}>›</span>}
              {item.href ? (
                <a href={item.href} className={cx('text-blue-600', 'hover:underline')}>
                  {item.label}
                </a>
              ) : (
                <span className={cx('font-medium', 'text-slate-800')}>{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : (
        <h1>{children}</h1>
      )}
    </header>
  )
}
