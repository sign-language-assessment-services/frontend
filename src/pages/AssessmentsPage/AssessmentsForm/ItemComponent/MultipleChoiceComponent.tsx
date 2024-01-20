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
  <div className={cx('flex', 'flex-col', 'min-[1700px]:flex-row', 'gap-6', 'items-stretch')}>
    <QuestionCard question={item.question} />
    <div
      className={cx(
        'flex',
        'flex-col',
        'content-center',
        'items-stretch',
        'gap-2',
        'basis-1/2',
        'sm:flex-wrap',
        'sm:flex-row',
        'sm:justify-center',
        'min-[1700px]:gap-6',
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
