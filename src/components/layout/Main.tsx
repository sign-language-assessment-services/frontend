import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  center?: boolean
}

export const Main: React.FC<Props> = ({ children, center }) => (
  <main
    className={cx(
      'flex-grow',
      'flex',
      'dark:text-gray-100',
      'justify-center',
      'from-gray-200',
      'via-gray-50',
      'to-gray-200',
      {
        'items-center': center,
      },
    )}
  >
    {children}
  </main>
)
