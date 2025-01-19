import BackButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/NextButton'
import SubmitButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/SubmitButton'

interface Props {
  previousPageUrl: string | undefined
  isLastPage: boolean
}

export default function ButtonArray({ previousPageUrl, isLastPage }: Props) {
  return (
    <>
      <BackButton previousPageUrl={previousPageUrl} disabled={!previousPageUrl} />
      <NextButton disabled={isLastPage} />
      <SubmitButton disabled={!isLastPage} />
    </>
  )
}
