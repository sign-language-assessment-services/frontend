import BackButton from '@/app/assessments/[assessmentId]/[taskId]/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[taskId]/NextButton'
import SubmitButton from '@/app/assessments/[assessmentId]/[taskId]/SubmitButton'
import CancelButton from '@/app/assessments/[assessmentId]/[taskId]/CancelButton'

interface Props {
  nextPageUrl: string | undefined
  previousPageUrl: string | undefined
}

export default function Buttons({ nextPageUrl, previousPageUrl }: Props) {
  return (
    <>
      <BackButton previousPageUrl={previousPageUrl} />
      {nextPageUrl ? <NextButton nextPageUrl={nextPageUrl} /> : <SubmitButton />}
      <CancelButton />
    </>
  )
}
