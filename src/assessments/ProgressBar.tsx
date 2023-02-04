import React from 'react'

type Props = { currentItem: number; totalItems: number }
export const ProgressBar: React.FC<Props> = (props) => (
  <div
    className="bg-blue-600 h-2.5 rounded-full"
    style={{ width: (100 * props.currentItem) / props.totalItems + '%' }}
  ></div>
)
