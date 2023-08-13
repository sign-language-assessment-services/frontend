import React from 'react'
import { StaticItem } from '../../models/staticItem'
import cx from 'classnames'

interface Props {
  item: StaticItem
}

export const StaticItemComponent: React.FC<Props> = ({ item: { content } }) => (
  <video className={cx('max-h-[70vh]')} src={content.url} controls muted />
)
