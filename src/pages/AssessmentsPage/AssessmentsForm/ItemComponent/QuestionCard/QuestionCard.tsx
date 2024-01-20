import cx from 'classnames'
import React from 'react'
import { Multimedia } from '../../../models/multimedia'
import { MultimediaComponent } from '../../../../../components/MultimediaComponent'

const QuestionCard = ({ question }: { question: Multimedia }) => (
  <div className={cx('flex', 'text-4xl', 'items-center', 'justify-between')}>
    <h3
      className={cx(
        'flex',
        'justify-center',
        'items-center',
        'max-[1600px]:max-w-2xl',
        'aspect-video',
        'border-2',
        'bg-gray-50',
        'dark:bg-gray-700',
        'dark:border-gray-400',
      )}
    >
      <span>
        <MultimediaComponent multimedia={question} />
      </span>
    </h3>
  </div>
)

export default QuestionCard
