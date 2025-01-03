import cx from 'classnames'
import { Checkbox } from './Checkbox/Checkbox'
import AnswerIdentifier from './AnswerIdentifier/AnswerIdentifier'
import React from 'react'

export const AnswerCardFooter = (props: {
  backgroundEffects: { 'bg-blue-200': boolean }
  commonEffects: {
    'group-hover:cursor-pointer': boolean
    'group-hover:drop-shadow-lg': boolean
    'border-blue-200': boolean
  }
  checked: boolean
  choiceId: string
}) => (
  <span
    className={cx('flex', 'justify-center', 'p-1', 'gap-2', 'border-t-2', {
      ...props.backgroundEffects,
      ...props.commonEffects,
    })}
  >
    <Checkbox checked={props.checked} id={props.choiceId} />
    <AnswerIdentifier checked={props.checked} choiceId={props.choiceId} />
  </span>
)
