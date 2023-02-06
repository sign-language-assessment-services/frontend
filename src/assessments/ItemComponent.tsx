import { Item } from './models'
import { AnswerCard } from './AnswerCard'
import React from 'react'
import cx from 'classnames'

interface Props {
  selectedChoices: string[]
  handleChange: (choiceIndex: string) => void
  item: Item
}

export const ItemComponent: React.FC<Props> = ({ handleChange, selectedChoices, item }) => (
  <div
    className={cx('flex', 'flex-grow', 'justify-center', 'items-stretch', 'p-4' /*,'flex-wrap''*/)}
  >
    <div className={cx('flex', 'text-4xl', 'items-center', 'justify-between', 'p-6')}>
      <h3
        className={cx(
          'flex',
          'justify-center',
          'items-center',
          'w-[600px]',
          'aspect-video',
          'p-6',
          'border-2',
          'bg-gray-50',
          'dark:bg-gray-700',
          'dark:border-gray-400',
          'shrink-1',
        )}
      >
        {item.description}
      </h3>
    </div>
    <div
      className={cx(
        'flex',
        'flex-wrap',
        'shrink-2',
        // 'w-1/2',
        'items-end',
        'justify-center',
        'content-center',
        'gap-6',
        // 'p-4',
      )}
    >
      {item.choices.map((choice, choiceIndex) => {
        return (
          <AnswerCard
            key={choiceIndex}
            checked={selectedChoices.includes(choiceIndex.toString()) ?? false}
            onChange={() => handleChange(choiceIndex.toString())}
            label={choice.label}
            choiceId={(choiceIndex + 1).toString()}
          />
        )
      })}
    </div>
  </div>
)
