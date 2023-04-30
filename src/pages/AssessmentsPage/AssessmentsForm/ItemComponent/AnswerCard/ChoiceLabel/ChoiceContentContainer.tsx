import cx from 'classnames'
import React from 'react'
import { Choice } from '../../../../models'

interface Props {
  checked: boolean
  choice: Choice
}

export const ChoiceContentContainer = ({ checked, choice }: Props) => {
  const className = cx(
    'flex',
    'justify-center',
    'items-center',
    'aspect-video',
    'w-[400px]',
    'bg-gray-50',
    'dark:bg-gray-700',

    { 'font-bold': checked },
  )

  return (
    <span className={className}>
      {choice.type === 'video' && <video src={choice.url} controls muted />}
      {choice.type === 'text' && choice.text}
    </span>
  )
}
