import AnswerCard from './AnswerCard/AnswerCard'
import cx from 'classnames'
import QuestionCard from './QuestionCard/QuestionCard'
import { Exercise } from '@/lib/models'
import {
  getExerciseSubmissionById,
  getSubmissionsByExercise,
  submitExercise,
} from '@/lib/apiClient'
import { redirect } from 'next/navigation'

interface Props {
  assessmentId: string
  exercise: Exercise
  nextPageUrl: string
}

export default async function ExerciseComponent({ exercise, assessmentId, nextPageUrl }: Props) {
  const oldChoices = await getPreviouslySelectedChoices(assessmentId, exercise)

  async function submitTask(formData: FormData) {
    'use server'
    const newChoices = extractSelectedChoices(formData)
    if (submissionNeeded(newChoices, oldChoices)) {
      await submitExercise(assessmentId, exercise.id, newChoices)
    }
    redirect(nextPageUrl)
  }

  return (
    <form id="task-form" action={submitTask} className={cx('w-full')}>
      <div className={cx('flex', 'flex-col', '2xl:flex-row', 'h-full', 'w-full')}>
        <QuestionCard question={exercise.question} />
        <div
          className={cx(
            'flex',
            'flex-col',
            'content-center',
            'gap-2',
            'basis-1/2',
            'sm:flex-wrap',
            'sm:flex-row',
            'sm:justify-center',
            '2xl:gap-6',
            'p-2',
            'md:p-8',
          )}
        >
          {exercise.choices.map((choice, index) => (
            <AnswerCard
              key={index}
              checked={oldChoices?.includes(choice.id) ?? false}
              choice={choice}
              choiceIndex={index}
            />
          ))}
        </div>
      </div>
    </form>
  )
}

async function getPreviouslySelectedChoices(
  assessmentId: string,
  exercise: Exercise,
): Promise<string[] | undefined> {
  const existingSubmissions = await getSubmissionsByExercise(assessmentId, exercise.id)
  if (existingSubmissions.length === 0) {
    return undefined
  }

  const submission = await getExerciseSubmissionById(
    existingSubmissions[existingSubmissions.length - 1].id,
  )
  return submission.answers
}

function submissionNeeded(newChoices: string[], oldChoices: string[] | undefined) {
  return !oldChoices || !equalsIgnoringOrder(newChoices, oldChoices)
}

function extractSelectedChoices(formData: FormData) {
  const rawFormData = Object.fromEntries(formData)
  return Object.keys(rawFormData).filter((key) => !key.startsWith('$'))
}

function equalsIgnoringOrder<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every((value) => b.includes(value))
}
