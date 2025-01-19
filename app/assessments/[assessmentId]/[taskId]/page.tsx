import { getAssessmentById, getExerciseById, getPrimerById } from '@/lib/apiClient'
import Main from '@/components/appshell/main/Main'
import Header from '@/components/appshell/header/Header'
import Footer from '@/components/appshell/footer/Footer'
import Buttons from './_components/buttons/Buttons'
import { getTranslations } from 'next-intl/server'
import PrimerComponent from '@/app/assessments/[assessmentId]/[taskId]/_components/primer/PrimerComponent'
import ExerciseComponent from '@/app/assessments/[assessmentId]/[taskId]/_components/exercise/ExerciseComponent'
import { Exercise, Primer } from '@/lib/models'

export default async function Task({
  params,
}: {
  params: Promise<{ assessmentId: string; taskId: string }>
}) {
  const t = await getTranslations('Assessment')
  const { assessmentId, taskId } = await params
  const assessment = await getAssessmentById(assessmentId)
  const task = assessment.tasks.find((it) => it.id === taskId)
  const taskType = task!.task_type

  const item = taskType === 'exercise' ? await getExerciseById(taskId) : await getPrimerById(taskId)
  const index = assessment.tasks.findIndex((it) => it.id === taskId)
  const isFirstPage = index === 0
  const isLastPage = index === assessment.tasks.length - 1

  const previousPageUrl = isFirstPage
    ? undefined
    : `/assessments/${assessmentId}/${assessment.tasks[index - 1].id}`
  const nextPageUrl = isLastPage
    ? `/assessments/${assessmentId}/submit`
    : `/assessments/${assessmentId}/${assessment.tasks[index + 1].id}`

  return (
    <>
      <Header>
        {assessment.name} – {t('page', { current: index + 1, total: assessment.tasks.length })}
      </Header>
      <Main>
        {taskType === 'primer' ? (
          <PrimerComponent primer={item as Primer} nextPageUrl={nextPageUrl} />
        ) : (
          <ExerciseComponent
            exercise={item as Exercise}
            assessmentId={assessmentId}
            nextPageUrl={nextPageUrl}
          />
        )}
      </Main>
      <Footer>
        <Buttons previousPageUrl={previousPageUrl} />
      </Footer>
    </>
  )
}
