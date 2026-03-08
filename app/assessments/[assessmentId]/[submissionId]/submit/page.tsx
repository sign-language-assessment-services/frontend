import { getAssessmentById, markAssessmentSubmissionAsFinished } from '@/lib/apiClient'
import { auth } from '@/lib/auth'
import Main from '@/components/appshell/main/Main'
import Footer from '@/components/appshell/footer/Footer'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import BackButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/BackButton'
import SubmitButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/SubmitButton'

export default async function SubmitPage({
  params,
}: {
  params: Promise<{ assessmentId: string; submissionId: string }>
}) {
  const { assessmentId, submissionId } = await params
  const session = await auth()
  const isTestTaker = session?.user?.roles?.includes('test-taker') ?? false
  if (!isTestTaker) {
    const assessment = await getAssessmentById(assessmentId)
    const lastTaskId = assessment.tasks[assessment.tasks.length - 1].id
    redirect(`/assessments/${assessmentId}/${submissionId}/${lastTaskId}`)
  }

  const t = await getTranslations('Submissions')
  const assessment = await getAssessmentById(assessmentId)
  const previousPageUrl = `/assessments/${assessmentId}/${submissionId}/${assessment.tasks[assessment.tasks.length - 1].id}`

  async function submitAssessment() {
    'use server'
    await markAssessmentSubmissionAsFinished(submissionId)
    redirect(`/assessments/${assessmentId}/${submissionId}/score`)
  }

  return (
    <>
      <Main center>
        {t('endOfAssessment')}
        <form id="assessment-submit" action={submitAssessment} />
      </Main>
      <Footer>
        <BackButton previousPageUrl={previousPageUrl} disabled={!previousPageUrl} />
        <SubmitButton />
      </Footer>
    </>
  )
}
