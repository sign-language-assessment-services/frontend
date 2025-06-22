import AnswerCard from './AnswerCard/AnswerCard'
import cx from 'classnames'
import QuestionCard from './QuestionCard/QuestionCard'
import { Exercise } from '@/lib/models'
import {
  createExerciseSubmission,
  getExerciseSubmissionByAssessmentSubmissionIdAndExerciseId,
} from '@/lib/apiClient'
import { redirect } from 'next/navigation'

interface Props {
  assessmentId: string
  assessmentSubmissionId: string
  exercise: Exercise
  nextPageUrl: string | undefined
  readOnly: boolean
}

export default async function ExerciseComponent({
  exercise,
  assessmentSubmissionId,
  nextPageUrl,
  readOnly,
}: Props) {
  const existingExerciseSubmission =
    await getExerciseSubmissionByAssessmentSubmissionIdAndExerciseId(
      assessmentSubmissionId,
      exercise.id,
    )
  const oldChoices = existingExerciseSubmission?.answers

  async function submitTask(formData: FormData) {
    'use server'
    if (!readOnly) {
      const newChoices = extractSelectedChoices(formData)
      if (submissionNeeded(newChoices, oldChoices)) {
        await createExerciseSubmission(assessmentSubmissionId, exercise.id, newChoices)
      }
    }
    redirect(nextPageUrl!)
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
              readOnly={readOnly}
            />
          ))}
        </div>
      </div>
    </form>
  )
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
