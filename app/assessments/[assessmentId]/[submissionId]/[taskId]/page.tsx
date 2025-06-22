import {
  getAssessmentById,
  getAssessmentSubmissionById,
  getExerciseById,
  getPrimerById,
} from '@/lib/apiClient'
import Main from '@/components/appshell/main/Main'
import Header from '@/components/appshell/header/Header'
import Footer from '@/components/appshell/footer/Footer'
import { getTranslations } from 'next-intl/server'
import PrimerComponent from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/primer/PrimerComponent'
import ExerciseComponent from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/exercise/ExerciseComponent'
import { Exercise, Primer } from '@/lib/models'
import CloseButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/CloseButton'
import BackButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/NextButton'

export default async function Task({
  params,
}: {
  params: Promise<{ assessmentId: string; submissionId: string; taskId: string }>
}) {
  const t = await getTranslations('Assessment')
  const { assessmentId, submissionId, taskId } = await params
  const assessment = await getAssessmentById(assessmentId)

  const submission = await getAssessmentSubmissionById(submissionId)

  const task = assessment.tasks.find((it) => it.id === taskId)
  const taskType = task!.task_type

  const item = taskType === 'exercise' ? await getExerciseById(taskId) : await getPrimerById(taskId)
  const index = assessment.tasks.findIndex((it) => it.id === taskId)
  const isFirstPage = index === 0
  const isLastPage = index === assessment.tasks.length - 1

  const previousPageUrl = isFirstPage
    ? undefined
    : `/assessments/${assessmentId}/${submissionId}/${assessment.tasks[index - 1].id}`
  const nextPageUrl =
    submission.finished && isLastPage
      ? undefined
      : isLastPage
        ? `/assessments/${assessmentId}/${submissionId}/submit`
        : `/assessments/${assessmentId}/${submissionId}/${assessment.tasks[index + 1].id}`

  return (
    <>
      <Header>
        {assessment.name} – {t('page', { current: index + 1, total: assessment.tasks.length })}
      </Header>
      <Main>
        <CloseButton />
        {taskType === 'primer' ? (
          <PrimerComponent primer={item as Primer} nextPageUrl={nextPageUrl} />
        ) : (
          <ExerciseComponent
            exercise={item as Exercise}
            assessmentId={assessmentId}
            assessmentSubmissionId={submissionId}
            nextPageUrl={nextPageUrl}
            readOnly={submission.finished}
          />
        )}
      </Main>
      <Footer>
        <BackButton previousPageUrl={previousPageUrl} disabled={!previousPageUrl} />
        <NextButton disabled={submission.finished && isLastPage} />
      </Footer>
    </>
  )
}
