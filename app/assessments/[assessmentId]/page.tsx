import { redirect } from 'next/navigation'
import { getAssessmentById } from '@/lib/apiClient'

export default async function Assessments({
  params,
}: {
  params: Promise<{ assessmentId: string }>
}): Promise<string> {
  const { assessmentId } = await params
  const assessment = await getAssessmentById(assessmentId)
  redirect(`/assessments/${assessmentId}/${assessment.tasks[0].id}`)
}
