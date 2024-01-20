import cx from 'classnames'
import React from 'react'

export const AnswerIdentifier = (props: { checked: boolean; choiceId: string }) => (
  <span className={cx('text-base', 'text-sm', 'lg:text-xl', { 'font-bold': props.checked })}>
    Antwort {props.choiceId}
  </span>
)
