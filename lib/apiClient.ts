import AssessmentSummary, {
  Assessment,
  Exercise,
  ExerciseSubmission,
  ExerciseSubmissionSummary,
  Primer,
  ScoreResponse,
  Submission,
} from '@/lib/models'
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

export async function createAssessmentSubmission(
  assessmentId: string,
  userId: string,
): Promise<void> {
  const url = `/assessment_submissions/${assessmentId}/submissions/`
  const body = { user_id: userId }
  await post(url, body)
}

export async function submitExercise(
  assessmentId: string,
  exerciseId: string,
  choices: string[],
): Promise<void> {
  const url = `/assessments/${assessmentId}/exercises/${exerciseId}/submissions/`
  const body = { choices: [...choices] }
  await post(url, body)
}

export async function getSubmissionsByExercise(
  assessmentId: string,
  exerciseId: string,
): Promise<ExerciseSubmissionSummary[]> {
  return get(`/assessments/${assessmentId}/exercises/${exerciseId}/submissions`)
}

export async function getExerciseSubmissionById(submissionId: string): Promise<ExerciseSubmission> {
  return get(`/submissions/${submissionId}`)
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const accessToken = await getAccessToken()
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (response.status >= 400) {
    throw new Error(`Failed to fetch data: ${response.statusText}. Path: ${path}`)
  }
  return response.json()
}

export async function getScore(assessmentId: string): Promise<ScoreResponse> {
  return get(`/assessments/${assessmentId}/score`)
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
