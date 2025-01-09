import { getAssessmentById } from '@/lib/apiClient'
import Main from '@/components/appshell/main/Main'
import Header from '@/components/appshell/header/Header'
import Footer from '@/components/appshell/footer/Footer'
import SubmitButton from '@/app/assessments/[assessmentId]/submit/_components/SubmitButton'
import BackButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/BackButton'
import CancelButton from '@/app/assessments/[assessmentId]/[taskId]/_components/buttons/CancelButton'

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
