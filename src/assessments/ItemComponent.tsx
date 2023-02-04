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
  <div className="flex flex-grow justify-center items-stretch p-4">
    <div className="flex w-1/2 text-4xl items-center justify-center border-r-2 border-dotted p-6">
      <h3 className="flex justify-center items-center aspect-video border-2 p-6 w-[700px] bg-gray-50">
        {item.description}
      </h3>
    </div>
    <div
      className={cx(
        'flex',
        'flex-wrap',
        'w-1/2',
        'items-end',
        'justify-center',
        'content-center',
        'gap-6',
        'p-4',
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
