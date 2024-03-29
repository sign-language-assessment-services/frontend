import { Multimedia } from '../pages/AssessmentsPage/models/multimedia'
import React from 'react'

interface Props {
  multimedia: Multimedia
}

export const MultimediaComponent: React.FC<Props> = ({ multimedia }: Props) => {
  switch (multimedia.type) {
    case 'video':
      return <video src={multimedia.url} style={{ maxHeight: 'inherit' }} controls muted />
    case 'image':
      return <img draggable={false} src={multimedia.url} />
  }
}
