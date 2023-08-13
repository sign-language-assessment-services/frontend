import cx from 'classnames'
import React from 'react'
import { Question } from '../../../models/question'

const QuestionCard = ({ question }: { question: Question }) => (
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
      <span>
        {question.type === 'video' && <video src={question.url} controls muted />}
        {question.type === 'text' && question.text}
      </span>
    </h3>
  </div>
)

export default QuestionCard
