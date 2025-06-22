import { getAssessmentById, getAssessmentSubmissionById } from '@/lib/apiClient'
import Main from '@/components/appshell/main/Main'
import Header from '@/components/appshell/header/Header'
import Footer from '@/components/appshell/footer/Footer'
import { getTranslations } from 'next-intl/server'
import Button from '@/components/button/Button'
import { redirect } from 'next/navigation'

export default async function AssessmentScore({
  params,
}: {
  params: Promise<{ assessmentId: string; submissionId: string }>
}) {
  const t = await getTranslations('Score')
  const { assessmentId, submissionId } = await params
  const submission = await getAssessmentSubmissionById(submissionId)
  console.log(submission)
  const score = submission.score
  const assessment = await getAssessmentById(assessmentId)
  const maxPoints = assessment.tasks.filter((task) => task.task_type === 'exercise').length

  async function retry() {
    'use server'
    redirect(`/assessments/${assessmentId}`)
  }

  async function overview() {
    'use server'
    redirect('/assessments')
  }

  return (
    <>
      <Header>
        {assessment.name} – {t('title')}
      </Header>
      <Main center>
        <div className="flex flex-col lg:gap-6 items-center">
          <span>{t('result')}</span>
          <span className="lg:text-6xl font-bold whitespace-pre-line text-center">
            {t('points', { points: score, maxPoints })}
          </span>
        </div>
      </Main>
      <Footer>
        <Button onClick={retry} icon="reload">
          {t('retry')}
        </Button>
        <Button onClick={overview}>{t('overview')}</Button>
      </Footer>
    </>
  )
}
