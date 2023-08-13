import { Choice } from './choice'
import { Question } from './question'

export interface Item {
  question: Question
  choices: Choice[]
}
