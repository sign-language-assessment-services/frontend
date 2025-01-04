import AssessmentSummary, { Assessment, Submission, Task } from '@/lib/models'
import { auth } from '@/lib/auth'

const BASE_URL = process.env.BACKEND_URL

export async function getAssessmentById(assessmentId: string): Promise<Assessment> {
  const url = `${BASE_URL}/assessments/${assessmentId}`

  const accessToken = await getAccessToken()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (response.status >= 400) {
    throw new Error(
      `Failed to fetch assessment: ${response.statusText}. Assessment ID: ${assessmentId}`,
    )
  }
  return response.json()
}

export async function getExerciseById(exerciseId: string): Promise<Task> {
  const url = `${BASE_URL}/exercises/${exerciseId}`

  const accessToken = await getAccessToken()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (response.status >= 400) {
    throw new Error(`Failed to fetch task: ${response.statusText}. Task ID: ${exerciseId}`)
  }
  return response.json()
}

export async function getPrimerById(primerId: string): Promise<Task> {
  const url = `${BASE_URL}/primers/${primerId}`

  const accessToken = await getAccessToken()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (response.status >= 400) {
    throw new Error(`Failed to fetch task: ${response.statusText}. Task ID: ${primerId}`)
  }
  return response.json()
}

export async function getAssessments(): Promise<AssessmentSummary[]> {
  const url = `${BASE_URL}/assessments`

  const accessToken = await getAccessToken()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (response.status >= 400) {
    throw new Error(`Failed to fetch assessments: ${response.statusText}`)
  }
  return response.json()
}

export async function getSubmissions(userId: string): Promise<Submission[]> {
  const url = `${BASE_URL}/submissions?user_id=${userId}`
  const token = await getAccessToken()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.status >= 400) {
    throw new Error(`Failed to fetch submissions: ${response.statusText}. User ID: ${userId}`)
  }
  return response.json()
}

export async function getMultimediaFileUrl(multimediaFileId: string): Promise<string> {
  const url = `${process.env.BACKEND_URL}/object-storage/${multimediaFileId}`
  const token = await getAccessToken()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.status >= 400) {
    throw new Error(
      `Failed to fetch multimedia file: ${response.statusText}. Multimedia file ID: ${multimediaFileId}`,
    )
  }
  const responseObject: { url: string } = await response.json()
  return responseObject.url
}

async function getAccessToken() {
  const session = await auth()
  return session!.access_token
}
