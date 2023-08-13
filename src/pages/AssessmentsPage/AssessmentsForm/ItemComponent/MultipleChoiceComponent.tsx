import { AnswerCard } from './AnswerCard/AnswerCard'
import React from 'react'
import cx from 'classnames'
import QuestionCard from './QuestionCard/QuestionCard'
import { MultipleChoice } from '../../models/multipleChoice'

interface Props {
  item: MultipleChoice
  selectedChoices: string[]
  handleChange: (choiceIndex: string) => void
}

export const MultipleChoiceComponent: React.FC<Props> = ({
  handleChange,
  selectedChoices,
  item,
}) => (
  <div className={cx('flex', 'flex-grow', 'justify-center', 'items-stretch', 'p-4')}>
    <QuestionCard question={item.question} />
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
