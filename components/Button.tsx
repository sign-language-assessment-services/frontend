import React, { ReactNode } from 'react'
import cx from 'classnames'

type IconType = 'prev' | 'next' | 'reload'

interface Props {
  icon?: IconType
  iconPosition?: 'left' | 'right'
  type?: 'submit' | 'button'
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  form?: string
  style?: 'WARNING' | 'SUCCESS'
}

export const Button = ({
  children,
  icon,
  iconPosition = 'right',
  type = 'button',
  style,
  ...props
}: Props) => {
  const classes = cx(
    'flex',
    'flex-row',
    'items-center',
    'justify-between',
    'gap-3',
    'font-bold',
    'rounded',
    'text-white',
    'text-sm',
    'md:text-xl',
    'py-3',
    'px-2',
    'h-16',
    'lg:h-20',
    'lg:py-6',
    'lg:px-4',
    {
      'bg-blue-500': type === 'button' && !style,
      'bg-red-500': type === 'button' && style === 'WARNING',
      'bg-green-500': type === 'submit',
      'opacity-50': props.disabled,
      'cursor-not-allowed': props.disabled,
      'text-white': !props.disabled,
      'hover:bg-blue-700': !props.disabled,
      'hover:bg-green-700': !props.disabled && type === 'submit',
      'hover:bg-red-700': !props.disabled && style === 'WARNING',
    },
  )

  const elements = icon ? (
    iconPosition === 'right' ? (
      <>
        <span className="hidden lg:block">{children}</span> <Icon type={icon} />
      </>
    ) : (
      <>
        <Icon type={icon} />
        <span className="hidden lg:block">{children}</span>
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
  return {
    prev: (
      <svg className="fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" />
      </svg>
    ),
    next: (
      <svg className="fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" />
      </svg>
    ),
    reload: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
  }[type]
}
