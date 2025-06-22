import BackButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/NextButton'
import SubmitButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/SubmitButton'

interface Props {
  previousPageUrl: string | undefined
  isLastPage: boolean
  showSubmit?: boolean
  showNext?: boolean
}

export default function ButtonArray({ previousPageUrl, isLastPage, showSubmit, showNext }: Props) {
  return (
    <>
      <BackButton previousPageUrl={previousPageUrl} disabled={!previousPageUrl} />
      {showNext && <NextButton disabled={isLastPage} />}
      {showSubmit && <SubmitButton disabled={!isLastPage} />}
    </>
  )
}
