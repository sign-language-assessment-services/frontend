import cx from 'classnames'
import React from 'react'
import { Multimedia } from '@/lib/models'
import MultimediaComponent from '@/app/assessments/[assessmentId]/[taskId]/_components/multimedia/MultimediaComponent'

interface Props {
  choice: Multimedia
}

export const ChoiceContentContainer = async ({ choice }: Props) => {
  const className = cx(
    'flex',
    'justify-center',
    'items-center',
    'aspect-video',
    'bg-gray-50',
    'peer-checked:font-bold',
  )

  return (
    <span className={className}>
      <MultimediaComponent multimedia={choice} />
    </span>
  )
}
