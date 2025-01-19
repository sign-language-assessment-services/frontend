import BackButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/NextButton'
import CancelButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/CancelButton'
import SubmitButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/SubmitButton'

interface Props {
  previousPageUrl: string | undefined
  isLastPage: boolean
}

export default function Buttons({ previousPageUrl, isLastPage }: Props) {
  return (
    <>
      <BackButton previousPageUrl={previousPageUrl} disabled={!previousPageUrl} />
      {isLastPage ? <SubmitButton /> : <NextButton />}
      <CancelButton />
    </>
  )
}
