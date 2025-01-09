import { Multimedia } from '@/lib/models'
import { getMultimediaFileUrl } from '@/lib/apiClient'
import Image from 'next/image'
import Video from '@/app/assessments/[assessmentId]/[taskId]/_components/multimedia/Video'

interface Props {
  multimedia: Multimedia
}

export default async function MultimediaComponent({ multimedia }: Props) {
  const url = await getMultimediaFileUrl(multimedia.multimedia_file_id)
  switch (multimedia.media_type) {
    case 'VIDEO':
      return <Video src={url} />
    case 'IMAGE':
      return <Image alt="" draggable={false} src={url} />
  }
}
