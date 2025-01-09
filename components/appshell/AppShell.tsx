import cx from 'classnames'
import { PropsWithChildren } from 'react'

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <div className={cx('absolute', 'inset-0', 'flex', 'flex-col', 'w-full')}>
      <main className={cx('flex', 'flex-col', 'flex-grow', 'text-2xl')}>{children}</main>
    </div>
  )
}
