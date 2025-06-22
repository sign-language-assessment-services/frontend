import { redirect } from 'next/navigation'
import {
  createAssessmentSubmission,
  getAssessmentSubmissionById,
  getAssessmentSubmissions,
} from '@/lib/apiClient'

export default async function Assessments({
  params,
}: {
  params: Promise<{ assessmentId: string }>
}): Promise<string> {
  const { assessmentId } = await params
  const submissionIds = await getAssessmentSubmissions()
  const existingSubmissions = await Promise.all(
    submissionIds.map(({ id }) => getAssessmentSubmissionById(id)),
  )
  const existingSubmission = existingSubmissions.find(
    (submission) => submission.assessment_id === assessmentId && !submission.finished,
  )
  const submissionId = existingSubmission
    ? existingSubmission.id
    : (await createAssessmentSubmission(assessmentId)).id!

  redirect(`/assessments/${assessmentId}/${submissionId}`)
}
