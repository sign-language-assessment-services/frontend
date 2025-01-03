import React from 'react'
import MultipleChoiceComponent from './exercise/MultipleChoiceComponent'
import { isExercise } from './typeGuards'
import StaticItemComponent from './primer/StaticItemComponent'
import { Primer, Task } from '@/lib/models'

interface Props {
  task: Task
  selectedChoices: string[]
}

export default async function TaskComponentWrapper({ task, selectedChoices }: Props) {
  if (isExercise(task)) {
    return <MultipleChoiceComponent selectedChoices={selectedChoices} exercise={task} />
  }
  return <StaticItemComponent primer={task as Primer} />
}
