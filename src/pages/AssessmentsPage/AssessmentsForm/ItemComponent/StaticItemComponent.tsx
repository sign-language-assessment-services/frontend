import React from 'react'
import { StaticItem } from '../../models/staticItem'
import { MultimediaComponent } from '../../../../components/MultimediaComponent'
import cx from 'classnames'

interface Props {
  item: StaticItem
}

export const StaticItemComponent: React.FC<Props> = ({ item: { content } }) => (
  <div className={cx('flex', 'h-full', 'justify-center', 'items-center')}>
    <MultimediaComponent multimedia={content} />
  </div>
)
