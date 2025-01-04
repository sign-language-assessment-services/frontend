import AssessmentSummary, { Assessment, Exercise, Primer, Submission } from '@/lib/models'
import { auth } from '@/lib/auth'

const BASE_URL = process.env.BACKEND_URL

export async function getAssessmentById(assessmentId: string): Promise<Assessment> {
  return get(`/assessments/${assessmentId}`)
}

export async function getExerciseById(exerciseId: string): Promise<Exercise> {
  return get(`/exercises/${exerciseId}`)
}

export async function getPrimerById(primerId: string): Promise<Primer> {
  return get(`/primers/${primerId}`)
}

export async function getAssessments(): Promise<AssessmentSummary[]> {
  return get('/assessments')
}

export async function getSubmissions(userId: string): Promise<Submission[]> {
  return get(`/submissions?user_id=${userId}`)
}

export async function getMultimediaFileUrl(multimediaFileId: string): Promise<string> {
  const response = await get<{ url: string }>(`/object-storage/${multimediaFileId}`)
  return response.url
}

async function get<T>(path: string): Promise<T> {
  const accessToken = await getAccessToken()
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (response.status >= 400) {
    throw new Error(`Failed to fetch data: ${response.statusText}. Path: ${path}`)
  }
  return response.json()
}

async function getAccessToken() {
  const session = await auth()
  return session!.access_token
}
