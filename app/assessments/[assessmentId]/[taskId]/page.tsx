import { getAssessmentById, getExerciseById, getPrimerById } from '@/lib/apiClient'
import ItemComponentWrapper from '@/app/assessments/[assessmentId]/[taskId]/ItemComponentWrapper'
import { Main } from '@/components/layout/Main'
import { Header } from '@/components/layout/header/Header'
import { Footer } from '@/components/layout/Footer'
import Buttons from './Buttons'
import { getTranslations } from 'next-intl/server'

export default async function Task({
  params,
}: {
  params: Promise<{ assessmentId: string; taskId: string }>
}) {
  const t = await getTranslations('Assessment')
  const { assessmentId, taskId } = await params
  const assessment = await getAssessmentById(assessmentId)
  const taskType = assessment.tasks.find((it) => it.id === taskId)!.task_type

  const item = taskType === 'exercise' ? await getExerciseById(taskId) : await getPrimerById(taskId)
  const index = assessment.tasks.findIndex((it) => it.id === taskId)
  const isFirstPage = index === 0
  const isLastPage = index === assessment.tasks.length - 1

  const previousPageUrl = isFirstPage
    ? undefined
    : `/assessments/${assessmentId}/${assessment.tasks[index - 1].id}`
  const nextPageUrl = isLastPage
    ? undefined
    : `/assessments/${assessmentId}/${assessment.tasks[index + 1].id}`

  return (
    <>
      <Header>
        {assessment.name} – {t('page', { current: index + 1, total: assessment.tasks.length })}
      </Header>
      <Main>
        <ItemComponentWrapper assessmentId={assessmentId} choices={[]} task={item} />
      </Main>
      <Footer>
        <Buttons previousPageUrl={previousPageUrl} nextPageUrl={nextPageUrl} />
      </Footer>
    </>
  )
}
