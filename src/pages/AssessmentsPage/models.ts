export interface Assessment {
  name: string
  items: Item[]
}

export interface Item {
  question: Question
  choices: Choice[]
}

export type Choice = TextChoice | VideoChoice

export interface TextChoice {
  type: 'text'
  text: string
}

export interface VideoChoice {
  type: 'video'
  url: string
}

export type Question = TextQuestion | VideoQuestion

export interface TextQuestion {
  type: 'text'
  text: string
}

export interface VideoQuestion {
  type: 'video'
  url: string
}

export type Submission = Record<string, string[]>

export interface ScoringResult {
  score: number
}
