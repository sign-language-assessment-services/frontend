import { Item } from '../../models'
import { AnswerCard } from './AnswerCard/AnswerCard'
import React from 'react'
import cx from 'classnames'

interface Props {
  selectedChoices: string[]
  handleChange: (choiceIndex: string) => void
  item: Item
}

export const ItemComponent: React.FC<Props> = ({ handleChange, selectedChoices, item }) => (
  <div className={cx('flex', 'flex-grow', 'justify-center', 'items-stretch', 'p-4')}>
    <ItemDescription description={item.description} />
    <div
      className={cx(
        'flex',
        'flex-wrap',
        'shrink-2',
        'items-end',
        'justify-center',
        'content-center',
        'gap-6',
      )}
    >
      {item.choices.map((choice, choiceIndex) => {
        return (
          <AnswerCard
            key={choiceIndex}
            checked={selectedChoices.includes(choiceIndex.toString()) ?? false}
            onChange={() => handleChange(choiceIndex.toString())}
            choice={choice}
            choiceId={(choiceIndex + 1).toString()}
          />
        )
      })}
    </div>
  </div>
)

const ItemDescription = (props: { description: string }) => (
  <div className={cx('flex', 'text-4xl', 'items-center', 'justify-between', 'p-6')}>
    <h3
      className={cx(
        'flex',
        'justify-center',
        'items-center',
        'w-[600px]',
        'aspect-video',
        'border-2',
        'bg-gray-50',
        'dark:bg-gray-700',
        'dark:border-gray-400',
        'shrink-1',
      )}
    >
      {props.description}
    </h3>
  </div>
)
