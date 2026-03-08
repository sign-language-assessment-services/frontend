import cx from 'classnames'
import { Children, PropsWithChildren } from 'react'

export default function Footer({ children }: PropsWithChildren) {
  const childArray = Children.toArray(children)
  const hasLeftSlot = childArray.length >= 3
  const left = hasLeftSlot ? childArray[0] : null
  const rest = hasLeftSlot ? childArray.slice(1) : childArray

  return (
    <footer
      className={cx(
        'flex',
        'items-center',
        'h-32',
        'p-4',
        'border-t-4',
        'bg-blue-100',
        'border-blue-200',
      )}
    >
      {hasLeftSlot && <div className="flex-shrink-0">{left}</div>}
      <div className="flex flex-1 justify-center items-center gap-6">{rest}</div>
    </footer>
  )
}
