import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  center?: boolean
}

export const Main: React.FC<Props> = ({ children, center }) => (
  <main
    className={cx('flex-grow', 'flex', 'dark:text-gray-100', 'justify-center', 'p-10', {
      'items-center': center,
    })}
  >
    {children}
  </main>
)
