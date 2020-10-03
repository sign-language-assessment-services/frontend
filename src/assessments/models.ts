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

export type Submission = Record<string, string[]>

export interface ScoringResult {
  score: number
}
