import cx from 'classnames'
import { Multimedia } from '@/lib/models'
import MultimediaComponent from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/multimedia/MultimediaComponent'

export default function QuestionCard({ question }: { question: Multimedia }) {
  return (
    <div
      className={cx(
        'flex',
        'justify-center',
        'items-center',
        'basis-1/2',
        'p-1',
        'md:p-8',
        'bg-blue-50',
        '2xl:border-r-2',
        'max-2xl:border-b-2',
        'border-blue-100',
      )}
    >
      <div
        className={cx(
          'flex',
          'justify-center',
          'items-center',
          'max-2xl:max-w-2xl',
          'aspect-video',
          'border-4',
          'bg-gray-50',
          'border-gray-200',
        )}
      >
        <span>
          <MultimediaComponent multimedia={question} />
        </span>
      </div>
    </div>
  )
}
