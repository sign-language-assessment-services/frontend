import cx from 'classnames'
import { Primer } from '@/lib/models'
import MultimediaComponent from '@/app/assessments/[assessmentId]/[taskId]/_components/multimedia/MultimediaComponent'
import { redirect } from 'next/navigation'

interface Props {
  primer: Primer
  nextPageUrl: string
}

export default async function PrimerComponent({ primer, nextPageUrl }: Props) {
  async function submitTask() {
    'use server'
    redirect(nextPageUrl)
  }

  return (
    <form id="task-form" action={submitTask} className={cx('w-full')}>
      <div
        className={cx('flex', 'flex-1', 'h-full', 'justify-center', 'items-center', 'bg-blue-50')}
      >
        <MultimediaComponent multimedia={primer} />
      </div>
    </form>
  )
}
