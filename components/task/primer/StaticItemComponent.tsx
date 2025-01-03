import cx from 'classnames'
import { Primer } from '@/lib/models'
import MultimediaComponent from '@/components/multimedia/MultimediaComponent'
import React from 'react'

interface Props {
  primer: Primer
}

export default async function StaticItemComponent({ primer }: Props) {
  return (
    <div className={cx('flex', 'h-full', 'justify-center', 'items-center')}>
      <MultimediaComponent multimedia={primer} />
    </div>
  )
}
