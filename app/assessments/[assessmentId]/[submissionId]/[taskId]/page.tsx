import {
  getAssessmentById,
  getAssessmentSubmissionById,
  getExerciseById,
  getPrimerById,
} from '@/lib/apiClient'
import { auth } from '@/lib/auth'
import Main from '@/components/appshell/main/Main'
import Footer from '@/components/appshell/footer/Footer'
import PrimerComponent from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/primer/PrimerComponent'
import ExerciseComponent from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/exercise/ExerciseComponent'
import { Exercise, Primer } from '@/lib/models'
import AssessmentFlowBar from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/AssessmentFlowBar'
import BackButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/BackButton'
import NextButton from '@/app/assessments/[assessmentId]/[submissionId]/[taskId]/_components/buttons/NextButton'

export default async function Task({
  params,
}: {
  params: Promise<{ assessmentId: string; submissionId: string; taskId: string }>
}) {
  const { assessmentId, submissionId, taskId } = await params
  const [assessment, submission, session] = await Promise.all([
    getAssessmentById(assessmentId),
    getAssessmentSubmissionById(submissionId),
    auth(),
  ])

  const isTestTaker = session?.user?.roles?.includes('test-taker') ?? false

  const task = assessment.tasks.find((it) => it.id === taskId)
  const taskType = task!.task_type

  const item = taskType === 'exercise' ? await getExerciseById(taskId) : await getPrimerById(taskId)
  const index = assessment.tasks.findIndex((it) => it.id === taskId)
  const isFirstPage = index === 0
  const isLastPage = index === assessment.tasks.length - 1

  const previousPageUrl = isFirstPage
    ? undefined
    : `/assessments/${assessmentId}/${submissionId}/${assessment.tasks[index - 1].id}`
  const canReachSubmit = isTestTaker && !submission.finished
  const nextPageUrl =
    submission.finished && isLastPage
      ? undefined
      : isLastPage
        ? (canReachSubmit ? `/assessments/${assessmentId}/${submissionId}/submit` : undefined)
        : `/assessments/${assessmentId}/${submissionId}/${assessment.tasks[index + 1].id}`

  return (
    <>
      <AssessmentFlowBar
        assessmentName={assessment.name}
        current={index + 1}
        total={assessment.tasks.length}
        confirmLeave={isTestTaker && !submission.finished}
      />
      <Main>
        {taskType === 'primer' ? (
          <PrimerComponent primer={item as Primer} nextPageUrl={nextPageUrl} />
        ) : (
          <ExerciseComponent
            exercise={item as Exercise}
            assessmentId={assessmentId}
            assessmentSubmissionId={submissionId}
            nextPageUrl={nextPageUrl}
            readOnly={submission.finished || !isTestTaker}
          />
        )}
      </Main>
      <Footer>
        <BackButton previousPageUrl={previousPageUrl} disabled={!previousPageUrl} />
        <NextButton
          disabled={isLastPage && (submission.finished || !isTestTaker)}
        />
      </Footer>
    </>
  )
}
