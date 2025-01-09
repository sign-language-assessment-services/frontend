import cx from 'classnames'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  center?: boolean
}

export default function Main({ children, center }: Props) {
  return (
    <main
      className={cx(
        'flex-grow',
        'flex',
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
}
