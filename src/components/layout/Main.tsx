import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

export const Main: React.FC<PropsWithChildren> = ({ children }) => (
  <main className={cx('flex-grow', 'flex', 'justify-center', 'items-center')}>{children}</main>
)
