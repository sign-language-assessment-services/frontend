export interface Submission {
  id: string
  created_at: string
  user_id: string
  assessment_id: string
  answers: Record<string, number[]>
  points: number
  maximum_points: number
  percentage: number
}
