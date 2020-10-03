import axios, { AxiosResponse } from 'axios'
import { Assessment, ScoringResult, Submission } from './models'

export const getAssessmentById = async (id: string): Promise<Assessment> => {
  const response: AxiosResponse<Assessment> = await axios.get(`/api/assessments/${id}`)
  return response.data
}

export const scoreAssessment = async (
  assessmentId: string,
  submission: Submission,
): Promise<ScoringResult> => {
  const response: AxiosResponse<ScoringResult> = await axios.post(
    `/api/assessments/${assessmentId}/submissions`,
    submission,
  )
  return response.data
}
