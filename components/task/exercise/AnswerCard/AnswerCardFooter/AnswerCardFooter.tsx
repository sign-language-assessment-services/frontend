import cx from 'classnames'
import { Checkbox } from './Checkbox/Checkbox'
import AnswerIdentifier from './AnswerIdentifier/AnswerIdentifier'
import React from 'react'

interface Props {
  checked: boolean
  choiceId: string
  choicePosition: number
}

export const AnswerCardFooter = ({ checked, choiceId, choicePosition }: Props) => (
  <span
    className={cx(
      'flex',
      'justify-center',
      'p-1',
      'gap-2',
      'border-t-2',
      'has-[:checked]:bg-blue-200',
      'has-[:checked]:border-blue-200',
      'group-hover:cursor-pointer',
    )}
  >
    <Checkbox checked={checked} id={choiceId} />
    <AnswerIdentifier choiceId={choicePosition} />
  </span>
)
