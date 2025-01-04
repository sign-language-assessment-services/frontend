import { Exercise, Task } from '@/lib/models'

export const isExercise = (task: Task): task is Exercise => task.hasOwnProperty('question')
