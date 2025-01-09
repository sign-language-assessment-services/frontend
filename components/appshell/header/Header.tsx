import cx from 'classnames'
import { PropsWithChildren } from 'react'
import UserPanel from './userPanel/UserPanel'

export default function Header({ children }: PropsWithChildren) {
  return (
    <header
      className={cx(
        'flex',
        'justify-between',
        'items-center',
        'h-12',
        'p-6',
        'bg-blue-100',
        'text-xs',
        'sm:text-lg',
        'border-b-4',
        'border-blue-200',
      )}
    >
      <h1>{children}</h1>

      <div className={cx('shrink-0', 'ml-5')}>
        <UserPanel />
      </div>
    </header>
  )
}
