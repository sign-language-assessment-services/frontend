import { redirect } from 'next/navigation'
import { getAssessmentById } from '@/lib/apiClient'

export default async function Assessments({
  params,
}: {
  params: Promise<{ assessmentId: string; submissionId: string }>
}): Promise<string> {
  const { assessmentId, submissionId } = await params
  const {
    tasks: [{ id: taskId }],
  } = await getAssessmentById(assessmentId)

  redirect(`/assessments/${assessmentId}/${submissionId}/${taskId}`)
}
