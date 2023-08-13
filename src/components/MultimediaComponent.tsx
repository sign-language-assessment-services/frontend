import { Multimedia } from '../pages/AssessmentsPage/models/multimedia'
import React from 'react'

interface Props {
  multimedia: Multimedia
}

export const MultimediaComponent: React.FC<Props> = ({ multimedia }: Props) => {
  switch (multimedia.type) {
    case 'video':
      return <video src={multimedia.url} controls muted />
    case 'image':
      return <img src={multimedia.url} />
  }
}
