import React from 'react'
import cx from 'classnames'
import { ChoiceContentContainer } from './ChoiceLabel/ChoiceContentContainer'
import { AnswerCardFooter } from './AnswerCardFooter/AnswerCardFooter'
import { Multimedia } from '../../../models/multimedia'

interface Props {
  checked: boolean
  choiceId: string
  onChange: () => void
  choice: Multimedia
}

export const AnswerCard = ({ checked, choice, onChange, choiceId }: Props) => {
  const commonEffects = {
    'group-hover:cursor-pointer': true,
    [`border-blue-200`]: checked,
    'group-hover:drop-shadow-lg': true,

    'dark:group-hover:bg-amber-600': !checked,
    'dark:group-hover:border-amber-600': !checked,

    'dark:group-hover:bg-blue-500': checked,
    'dark:group-hover:border-blue-500': checked,
    'dark:border-blue-600': checked,
  }

  const backgroundEffects = {
    [`bg-blue-200`]: checked,
    [`dark:bg-blue-600`]: checked,
  }

  return (
    <div className={cx('flex', 'flex-shrink', 'justify-center', 'items-center')}>
      <div className="group">
        <label
          className={cx(
            'flex',
            'flex-col',
            'justify-around',
            'items-stretch',
            'border-2',
            'bg-white',
            'dark:border-gray-400',
            'dark:bg-gray-700',
            {
              ...commonEffects,
            },
          )}
        >
          <ChoiceContentContainer checked={checked} choice={choice} />
          <AnswerCardFooter
            checked={checked}
            onChange={onChange}
            choiceId={choiceId}
            backgroundEffects={backgroundEffects}
            commonEffects={commonEffects}
          />
        </label>
      </div>
    </div>
  )
}
