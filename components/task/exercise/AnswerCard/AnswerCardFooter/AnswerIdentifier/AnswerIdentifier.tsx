import cx from 'classnames'
import React from 'react'
import { getTranslations } from 'next-intl/server'

interface Props {
  checked: boolean
  choiceId: string
}

export default async function AnswerIdentifier(props: Props) {
  const t = await getTranslations('Assessment')
  return (
    <span className={cx('text-base', 'text-sm', 'lg:text-xl', { 'font-bold': props.checked })}>
      {t('answer', { number: props.choiceId })}
    </span>
  )
}
