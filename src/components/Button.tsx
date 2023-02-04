import React, { ButtonHTMLAttributes } from 'react'

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
  const className = props.disabled
    ? 'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
    : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
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
      <button
        type={type}
        className={className + ' flex flex-row items-center justify-between gap-3'}
        {...props}
      >
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
  const className = 'fill-current w-4 h-4 mr-2'
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d={pathData} />
    </svg>
  )
}
