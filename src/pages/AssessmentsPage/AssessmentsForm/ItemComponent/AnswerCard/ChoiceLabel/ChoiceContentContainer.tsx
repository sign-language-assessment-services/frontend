import cx from 'classnames'
import React from 'react'
import { Multimedia } from '../../../../models/multimedia'
import { MultimediaComponent } from '../../../../../../components/MultimediaComponent'

interface Props {
  checked: boolean
  choice: Multimedia
}

export const ChoiceContentContainer = ({ checked, choice }: Props) => {
  const className = cx(
    'flex',
    'justify-center',
    'items-center',
    'aspect-video',
    'bg-gray-50',
    'dark:bg-gray-700',

    { 'font-bold': checked },
  )

  return (
    <span className={className}>
      <MultimediaComponent multimedia={choice} />
    </span>
  )
}
