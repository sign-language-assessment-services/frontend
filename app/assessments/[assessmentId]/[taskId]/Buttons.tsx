import BackButton from '@/app/assessments/[assessmentId]/[taskId]/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[taskId]/NextButton'
import CancelButton from '@/app/assessments/[assessmentId]/[taskId]/CancelButton'

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
