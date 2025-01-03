import TaskComponentWrapper from '@/components/task/TaskComponentWrapper'
import { Task } from '@/lib/models'

interface Props {
  assessmentId: string
  task: Task
  choices: string[]
}

export default function ItemComponentWrapper({ task, choices }: Props) {
  return <TaskComponentWrapper task={task} selectedChoices={choices} />
}
