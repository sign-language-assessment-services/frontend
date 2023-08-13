import { Choice } from './choice'
import { Question } from './question'

export interface MultipleChoice {
  position: number
  question: Question
  choices: Choice[]
}
