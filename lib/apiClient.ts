import AssessmentSummary, {
  Assessment,
  AssessmentSubmission,
  AssessmentSubmissionSummary,
  Exercise,
  ExerciseSubmission,
  Primer,
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

export async function getAssessmentSubmissions(): Promise<AssessmentSubmissionSummary[]> {
  return get(`/assessment_submissions`)
}

export async function getMultimediaFileUrl(multimediaFileId: string): Promise<string> {
  const response = await get<{ url: string }>(`/multimedia_files/${multimediaFileId}`)
  return response.url
}

interface CreateAssessmentSubmissionResponse {
  id: string
}

export async function createAssessmentSubmission(
  assessmentId: string,
): Promise<CreateAssessmentSubmissionResponse> {
  const url = `/assessments/${assessmentId}/submissions/`
  return await post(url)
}

export async function createExerciseSubmission(
  assessmentSubmissionId: string,
  exerciseId: string,
  choiceIds: string[],
): Promise<void> {
  const url = `/assessment_submissions/${assessmentSubmissionId}/exercises/${exerciseId}/submissions/`
  const body = { answer: [...choiceIds] }
  await post(url, body)
}

export async function getAssessmentSubmissionById(
  submissionId: string,
): Promise<AssessmentSubmission> {
  return await get(`/assessment_submissions/${submissionId}`)
}

export async function getExerciseSubmissionById(submissionId: string): Promise<ExerciseSubmission> {
  return get(`/exercise_submissions/${submissionId}`)
}

export async function getExerciseSubmissionByAssessmentSubmissionIdAndExerciseId(
  assessmentSubmissionId: string,
  exerciseId: string,
): Promise<ExerciseSubmission | undefined> {
  const submissionIds = await getExerciseSubmissions()
  const submissions = await Promise.all(
    submissionIds.map(async ({ id }) => await getExerciseSubmissionById(id)),
  )
  const filteredSubmissions = submissions.filter(
    ({ assessment_submission_id, exercise_id }) =>
      assessment_submission_id === assessmentSubmissionId && exercise_id === exerciseId,
  )
  return filteredSubmissions[0]
}

export async function getExerciseSubmissions(): Promise<{ id: string }[]> {
  return get('/exercise_submissions/')
}

export async function markAssessmentSubmissionAsFinished(
  assessmentSubmissionId: string,
): Promise<void> {
  const url = `/assessment_submissions/${assessmentSubmissionId}`
  await put(url, { finished: true })
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

async function post<T>(path: string, body?: unknown): Promise<T> {
  const accessToken = await getAccessToken()
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
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

async function put<T>(path: string, body?: unknown): Promise<T> {
  const accessToken = await getAccessToken()
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
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

async function getAccessToken() {
  const session = await auth()
  return session!.access_token
}
