export interface Choice {
  label: string
  is_correct: boolean
}

export interface Item {
  description: string
  choices: Choice[]
}

export interface Assessment {
  name: string
  items: Item[]
}
