export interface Assessment {
  name: string
  items: Item[]
}

export interface Item {
  description: string
  choices: Choice[]
}

export interface Choice {
  label: string
}

export type Submission = Record<number, number[]>

export interface ScoringResult {
  score: number
}
