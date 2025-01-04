import { getAssessmentById } from '@/lib/apiClient'
import { Main } from '@/components/layout/Main'
import { Header } from '@/components/layout/header/Header'
import { Footer } from '@/components/layout/Footer'
import SubmitButton from '@/app/assessments/[assessmentId]/submit/SubmitButton'
import BackButton from '@/app/assessments/[assessmentId]/[taskId]/BackButton'
import CancelButton from '@/app/assessments/[assessmentId]/[taskId]/CancelButton'

export default async function Task({
  params,
}: {
  params: Promise<{ assessmentId: string; taskId: string }>
}) {
  const { assessmentId } = await params
  const assessment = await getAssessmentById(assessmentId)
  const lastTask = assessment.tasks[assessment.tasks.length - 1]

  async function submitAssessment(formData: FormData) {
    'use server'
    console.log(formData)
  }

  return (
    <>
      <Header>{assessment.name}</Header>
      <Main>
        <form id="assessment" action={submitAssessment}>
          Zusammenfassung
        </form>
      </Main>
      <Footer>
        <BackButton previousPageUrl={`/assessments/${assessmentId}/${lastTask.id}`} />
        <SubmitButton formId="assessment" />
        <CancelButton />
      </Footer>
    </>
  )
}
