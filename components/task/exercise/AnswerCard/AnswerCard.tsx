import React from 'react'
import cx from 'classnames'
import { ChoiceContentContainer } from './ChoiceLabel/ChoiceContentContainer'
import { AnswerCardFooter } from './AnswerCardFooter/AnswerCardFooter'
import { Multimedia } from '@/lib/models'

interface Props {
  checked: boolean
  choiceId: string
  choice: Multimedia
}

export const AnswerCard = async ({ checked, choice, choiceId }: Props) => {
  const commonEffects = {
    'group-hover:cursor-pointer': true,
    [`border-blue-200`]: checked,
    'group-hover:drop-shadow-lg': true,
  }

  const backgroundEffects = {
    [`bg-blue-200`]: checked,
  }

  return (
    <div
      className={cx(
        'flex',
        'flex-shrink',
        'justify-center',
        'items-center',
        '2xl:max-w-[48%]',
        'max-w-xl',
      )}
    >
      <div className="group w-full">
        <label
          className={cx('flex', 'flex-col', 'justify-around', 'border-2', 'bg-white', {
            ...commonEffects,
          })}
        >
          <ChoiceContentContainer checked={checked} choice={choice} />
          <AnswerCardFooter
            checked={checked}
            choiceId={choiceId}
            backgroundEffects={backgroundEffects}
            commonEffects={commonEffects}
          />
        </label>
      </div>
    </div>
  )
}
