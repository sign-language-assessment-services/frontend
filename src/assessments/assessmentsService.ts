import { Assessment, ScoringResult, Submission } from './models'

export const getAssessmentById = async (id: string): Promise<Assessment> => {
  const response = await fetch(`/api/assessments/${id}`)
  const json = await response.json()
  return json as Assessment
}

export const scoreAssessment = async (
  assessmentId: string,
  submission: Submission,
): Promise<ScoringResult> => {
  const response: Response = await fetch(`/api/assessments/${assessmentId}/submissions/`, {
    method: 'POST',
    body: JSON.stringify(submission),
    headers: { 'Content-Type': 'application/json' },
  })
  const json = await response.json()
  return json as ScoringResult
}
