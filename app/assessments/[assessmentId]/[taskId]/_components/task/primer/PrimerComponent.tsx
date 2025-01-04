import cx from 'classnames'
import { Primer } from '@/lib/models'
import MultimediaComponent from '@/app/assessments/[assessmentId]/[taskId]/_components/multimedia/MultimediaComponent'
import React from 'react'

interface Props {
  primer: Primer
}

export default async function PrimerComponent({ primer }: Props) {
  return (
    <div className={cx('flex', 'flex-1', 'h-full', 'justify-center', 'items-center', 'bg-blue-50')}>
      <MultimediaComponent multimedia={primer} />
    </div>
  )
}
