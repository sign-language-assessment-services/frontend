import cx from 'classnames'
import { PropsWithChildren } from 'react'

export default function Footer({ children }: PropsWithChildren) {
  return (
    <footer
      className={cx(
        'flex',
        'justify-center',
        'items-center',
        'gap-6',
        'h-32',
        'p-4',
        'border-t-4',
        'bg-blue-100',
        'border-blue-200',
      )}
    >
      {children}
    </footer>
  )
}
