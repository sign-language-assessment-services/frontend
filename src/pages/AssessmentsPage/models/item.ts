import { Choice } from './choice'
import { Question } from './question'

export interface Item {
  position: number
  question: Question
  choices: Choice[]
}
