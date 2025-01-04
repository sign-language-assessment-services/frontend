import BackButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/NextButton'
import CancelButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/CancelButton'

interface Props {
  previousPageUrl: string | undefined
}

export default function Buttons({ previousPageUrl }: Props) {
  return (
    <>
      <BackButton previousPageUrl={previousPageUrl} disabled={!previousPageUrl} />
      <NextButton />
      <CancelButton />
    </>
  )
}
