import cx from 'classnames'
import React from 'react'

interface Props {
  checked: boolean
  label: string
}

export const ChoiceLabel = ({ checked, label }: Props) => (
  <span
    className={cx(
      'flex',
      'justify-center',
      'items-center',
      'aspect-video',
      'w-[400px]',
      'bg-gray-50',
      'dark:bg-gray-700',

      { 'font-bold': checked },
    )}
  >
    {label}
  </span>
)
