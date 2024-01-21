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
  <div className={cx('flex', 'flex-col', '2xl:flex-row', 'h-full', 'w-full')}>
    <QuestionCard question={item.question} />
    <div
      className={cx(
        'flex',
        'flex-col',
        'content-center',
        'gap-2',
        'basis-1/2',
        'sm:flex-wrap',
        'sm:flex-row',
        'sm:justify-center',
        '2xl:gap-6',
        'p-2',
        'md:p-8',
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
