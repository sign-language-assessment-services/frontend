import { Multimedia } from '@/lib/models'
import { getMultimediaFileUrl } from '@/lib/apiClient'
import Video from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/multimedia/Video'
import cx from 'classnames'

interface Props {
  multimedia: Multimedia
}

export default async function MultimediaComponent({ multimedia }: Props) {
  const url = await getMultimediaFileUrl(multimedia.multimedia_file_id)
  return (
    <div className={cx('cursor-default')}>
      {multimedia.media_type === 'VIDEO' ? <Video src={url} /> : <img src={url} />}
    </div>
  )
}
