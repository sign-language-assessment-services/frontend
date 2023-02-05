import React, { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

type IconType = 'prev' | 'next'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType
  iconPosition?: 'left' | 'right'
}
export const Button = ({
  children,
  icon,
  iconPosition = 'right',
  type = 'button',
  ...props
}: Props) => {
  const classes = cx(
    'flex',
    'flex-row',
    'items-center',
    'justify-between gap-3',
    'font-bold',
    'rounded',
    'text-white',
    'py-6',
    'px-4',
    'dark:text-amber-400',
    'dark:bg-blue-900',
    {
      'bg-blue-500': type !== 'submit',
      'bg-green-500': type === 'submit',
      'opacity-50': props.disabled,
      'cursor-not-allowed': props.disabled,
      'text-white': !props.disabled,
      'hover:bg-blue-700': !props.disabled,
      'hover:bg-green-700': !props.disabled && type === 'submit',
    },
  )

  const elements = icon ? (
    iconPosition === 'right' ? (
      <>
        <span>{children}</span> <Icon type={icon} />
      </>
    ) : (
      <>
        <Icon type={icon} />
        <span>{children}</span>
      </>
    )
  ) : (
    <span>{children}</span>
  )
  return (
    <div>
      <button type={type} className={classes} {...props}>
        {elements}
      </button>
    </div>
  )
}

const Icon = ({ type }: { type: IconType }) => {
  const pathData = {
    prev: 'M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z',
    next: 'M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z',
  }[type]
  const className = 'fill-current w-8 h-8'
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d={pathData} />
    </svg>
  )
}
