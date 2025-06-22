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

export interface AssessmentSubmission {
  id: string
  user_id: string
  assessment_id: string
  answers: Record<string, number[]>
  score: number
  maximum_points: number
  percentage: number
  finished_at: string
  finished: boolean
}

export interface AssessmentSubmissionSummary {
  id: string
}

export interface ExerciseSubmission {
  id: string
  user_id: string
  assessment_id: string
  answers: string[]
  assessment_submission_id: string
  exercise_id: string
}
