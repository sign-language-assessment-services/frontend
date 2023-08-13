import React from 'react'
import { StaticItem } from '../../models/staticItem'
import { MultimediaComponent } from '../../../../components/MultimediaComponent'
import cx from 'classnames'

interface Props {
  item: StaticItem
}

export const StaticItemComponent: React.FC<Props> = ({ item: { content } }) => (
  <div className={cx('max-h-[70vh]')}>
    <MultimediaComponent multimedia={content} />
  </div>
)
