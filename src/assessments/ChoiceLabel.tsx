import cx from 'classnames'
import React from 'react'

export const ChoiceLabel = (props: { checked: boolean; label: string }) => (
  <span
    className={cx(
      'flex',
      'justify-center',
      'items-center',
      'aspect-video',
      'w-[350px]',
      'bg-gray-50',
      { 'font-bold': props.checked },
    )}
  >
    {props.label}
  </span>
)
