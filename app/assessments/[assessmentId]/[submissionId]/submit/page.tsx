import { getAssessmentById, markAssessmentSubmissionAsFinished } from '@/lib/apiClient'
import Main from '@/components/appshell/main/Main'
import Header from '@/components/appshell/header/Header'
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
      <Header>
        {assessment.name} – {t('title')}
      </Header>
      <Main center>
        Submit it!
        <form id="assessment-submit" action={submitAssessment} />
      </Main>
      <Footer>
        <BackButton previousPageUrl={previousPageUrl} disabled={!previousPageUrl} />
        <SubmitButton />
      </Footer>
    </>
  )
}
