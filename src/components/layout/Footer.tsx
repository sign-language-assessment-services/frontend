import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

export const Footer: React.FC<PropsWithChildren> = ({ children }) => (
  <footer
    className={cx(
      'flex',
      'justify-center',
      'gap-6',
      'items-center',
      'h-32',
      'border-t-4',
      'p-4',
      'bg-blue-100',
      'border-blue-200',
      'dark:bg-gray-900',
      'dark:text-amber-500',
      'dark:border-gray-700',
    )}
  >
    {children}
  </footer>
)
