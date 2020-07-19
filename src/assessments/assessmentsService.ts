import axios, { AxiosResponse } from 'axios'
import { Assessment } from './models'

export const getAssessmentById = async (id: string): Promise<Assessment> => {
  const result: AxiosResponse<Assessment> = await axios.get(`/api/assessments/${id}`)
  return result.data
}
