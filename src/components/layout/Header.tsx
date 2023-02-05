import cx from 'classnames'
import React, { PropsWithChildren } from 'react'
import { UserPanel } from '../UserPanel'

export const Header: React.FC<PropsWithChildren> = ({ children }) => (
  <header
    className={cx(
      'flex',
      'h-12',
      'text-center',
      'items-center',
      'justify-between',
      'bg-blue-100',
      'border-b-4',
      'border-blue-200',
      'text-lg',
      'p-6',
      'dark:bg-gray-900',
      'dark:text-amber-400',
      'dark:border-gray-700',
    )}
  >
    <h1>{children}</h1>

    <div className="shrink-0 ml-5">
      <UserPanel />
    </div>
  </header>
)
