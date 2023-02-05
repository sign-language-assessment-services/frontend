import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => (
  <div
    className={cx(
      'absolute',
      'inset-0',
      'flex',
      'flex-col',
      'items-stretch',
      'font-sans',
      'dark:bg-gray-800',
    )}
  >
    <main className={cx('flex', 'flex-col', 'flex-grow', 'text-2xl')}>{children}</main>
  </div>
)
