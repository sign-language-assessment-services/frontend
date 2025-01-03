import { AnswerCard } from './AnswerCard/AnswerCard'
import React from 'react'
import cx from 'classnames'
import QuestionCard from './QuestionCard/QuestionCard'
import { Exercise } from '@/lib/models'

interface Props {
  exercise: Exercise
  selectedChoices: string[]
}

export default async function MultipleChoiceComponent({ selectedChoices, exercise }: Props) {
  return (
    <div className={cx('flex', 'flex-col', '2xl:flex-row', 'h-full', 'w-full')}>
      <QuestionCard question={exercise.question} />
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
        {exercise.choices.map((choice, choiceIndex) => {
          return (
            <AnswerCard
              key={choiceIndex}
              checked={selectedChoices.includes((choiceIndex + 1).toString()) ?? false}
              choice={choice}
              choiceId={(choiceIndex + 1).toString()}
            />
          )
        })}
      </div>
    </div>
  )
}
