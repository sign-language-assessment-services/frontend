import React from 'react'
import cx from 'classnames'
import { ChoiceLabel } from './ChoiceLabel/ChoiceLabel'

interface Props {
  checked: boolean
  choiceId: string
  onChange: () => void
  label: string
}

function AnswerIdentifier(props: { checked: boolean; choiceId: string }) {
  return (
    <span className={cx('text-base', { 'font-bold': props.checked })}>
      Antwort {props.choiceId}
    </span>
  )
}

function Checkbox(props: { checked: boolean; onChange: () => void }) {
  return (
    <input className="peer" type="checkbox" checked={props.checked} onChange={props.onChange} />
  )
}

function AnswerCardFooter(props: {
  backgroundEffects: { 'bg-blue-200': boolean }
  commonEffects: {
    'group-hover:cursor-pointer': boolean
    'group-hover:drop-shadow-lg': boolean
    'border-blue-200': boolean
  }
  checked: boolean
  onChange: () => void
  choiceId: string
}) {
  return (
    <span
      className={cx(
        'flex',
        'justify-center',
        'p-1',
        'gap-2',
        'border-t-2',
        'dark:border-gray-400',
        {
          ...props.backgroundEffects,
          ...props.commonEffects,
        },
      )}
    >
      <Checkbox checked={props.checked} onChange={props.onChange} />
      <AnswerIdentifier checked={props.checked} choiceId={props.choiceId} />
    </span>
  )
}

export const AnswerCard = ({ checked, label, onChange, choiceId }: Props) => {
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
          <ChoiceLabel checked={checked} label={label} />
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
