import React from 'react'
import cx from 'classnames'

interface Props {
  checked: boolean
  choiceId: string
  onChange: () => void
  label: string
}

export const ChoiceComponent = ({ checked, label, onChange, choiceId }: Props) => {
  const commonEffects = {
    [`border-blue-200`]: checked,
    'group-hover:drop-shadow-lg': true,
    'group-hover:cursor-pointer': true,
  }

  const backgroundEffects = {
    [`bg-blue-200`]: checked,
  }

  return (
    <div className={cx('flex-grow', 'flex', 'flex-shrink', 'justify-center', 'items-center')}>
      <div className="group">
        <label
          className={cx(
            'flex',
            'flex-col',
            'justify-around',
            'items-stretch',
            'border-2',
            'bg-white',
            {
              ...commonEffects,
            },
          )}
        >
          <span
            className={cx(
              'flex',
              'justify-center',
              'items-center',
              'aspect-video',
              'w-[350px]',
              'font-bold',
              'bg-gray-50',
            )}
          >
            {label}
          </span>
          <span
            className={cx('flex', 'justify-center', 'p-1', 'gap-2', 'border-t-2', {
              ...backgroundEffects,
              ...commonEffects,
            })}
          >
            <input className="peer" type="checkbox" checked={checked} onChange={onChange} />
            <span className={cx('text-base', { 'font-bold': checked })}>Antwort {choiceId}</span>
          </span>
        </label>
      </div>
    </div>
  )
}
