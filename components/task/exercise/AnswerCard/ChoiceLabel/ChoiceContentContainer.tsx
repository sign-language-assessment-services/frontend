import cx from 'classnames'
import React from 'react'
import { Multimedia } from '@/lib/models'
import MultimediaComponent from '@/components/multimedia/MultimediaComponent'

interface Props {
  checked: boolean
  choice: Multimedia
}

export const ChoiceContentContainer = async ({ checked, choice }: Props) => {
  const className = cx(
    'flex',
    'justify-center',
    'items-center',
    'aspect-video',
    'bg-gray-50',

    { 'font-bold': checked },
  )

  return (
    <span className={className}>
      <MultimediaComponent multimedia={choice} />
    </span>
  )
}
