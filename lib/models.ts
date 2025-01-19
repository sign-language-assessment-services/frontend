export interface Assessment {
  name: string
  tasks: { id: string; task_type: 'exercise' | 'primer' }[]
}

export interface Task {
  id: string
}

export interface Exercise extends Task {
  question: Multimedia
  choices: Choice[]
}

export interface Primer extends Task, Multimedia {}

export interface Multimedia {
  media_type: 'VIDEO' | 'IMAGE'
  multimedia_file_id: string
}

export interface Choice extends Multimedia {
  id: string
}

export default interface AssessmentSummary {
  id: number
  name: string
}

export interface Submission {
  id: string
  user_id: string
  assessment_id: string
  answers: Record<string, number[]>
  points: number
  maximum_points: number
  percentage: number
}

export interface ExerciseSubmissionSummary {
  id: string
}

export interface ExerciseSubmission {
  id: string
  user_id: string
  assessment_id: string
  answers: string[]
}

export interface SubmissionRequest {
  choices: string[]
}

export interface ScoreResponse {
  points: number
}
