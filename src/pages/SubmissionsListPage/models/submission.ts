export interface Submission {
  id: string
  user_id: string
  assessment_id: string
  answers: Record<string, number[]>
  score: number
}
