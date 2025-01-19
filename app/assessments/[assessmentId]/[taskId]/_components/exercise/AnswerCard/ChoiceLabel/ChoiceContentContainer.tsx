import cx from 'classnames'
import { Multimedia } from '@/lib/models'
import MultimediaComponent from '@/app/assessments/[assessmentId]/[taskId]/_components/multimedia/MultimediaComponent'

interface Props {
  choice: Multimedia
}

export default function ChoiceContentContainer({ choice }: Props) {
  const className = cx(
    'flex',
    'justify-center',
    'items-center',
    'aspect-video',
    'peer-checked:font-bold',
  )

  return (
    <span className={className}>
      <MultimediaComponent multimedia={choice} />
    </span>
  )
}
