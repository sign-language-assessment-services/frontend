export interface Assessment {
  name: string
  items: Item[]
}

export interface Item {
  description: string
  choices: Choice[]
}

export type Choice = TextChoice | VideoChoice

export interface TextChoice {
  type: 'text'
  label: string
}

export interface VideoChoice {
  type: 'video'
  url: string
}

export type Submission = Record<string, string[]>

export interface ScoringResult {
  score: number
}
