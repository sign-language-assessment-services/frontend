import { getAssessmentById, getScore } from '@/lib/apiClient'
import Main from '@/components/appshell/main/Main'
import Header from '@/components/appshell/header/Header'
import Footer from '@/components/appshell/footer/Footer'
import { getTranslations } from 'next-intl/server'
import Button from '@/components/button/Button'
import { navigate } from 'next/dist/client/components/segment-cache/navigation'
import { redirect } from 'next/navigation'

export default async function AssessmentScore({
  params,
}: {
  params: Promise<{ assessmentId: string; taskId: string }>
}) {
  const t = await getTranslations('Score')
  const { assessmentId } = await params
  const { points } = await getScore(assessmentId)

  const assessment = await getAssessmentById(assessmentId)

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
          <span className="lg:text-6xl font-bold">{t('points', { points })}</span>
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
