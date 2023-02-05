import cx from 'classnames'
import React from 'react'

export const ChoiceLabel = (props: { checked: boolean; label: string }) => (
  <span
    className={cx(
      'flex',
      'justify-center',
      'items-center',
      'aspect-video',
      'w-[400px]',
      'bg-gray-50',
      'dark:bg-gray-700',

      'dark:text-white',
      { 'font-bold': props.checked },
    )}
  >
    {props.label}
  </span>
)
