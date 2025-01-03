import { getAssessments } from '@/lib/apiClient'
import { AssessmentSummaryComponent } from '@/app/assessments/AssessmentSummaryComponent'
import React from 'react'
import { Header } from '@/components/layout/header/Header'
import { Main } from '@/components/layout/Main'
import cx from 'classnames'
import { getTranslations } from 'next-intl/server'

export default async function Assessments() {
  const t = await getTranslations('Assessments')
  const assessments = await getAssessments()
  const assessmentSummaryComponents = assessments.map((assessment, i) => (
    <AssessmentSummaryComponent key={i} assessment={assessment} />
  ))

  return (
    <>
      <Header>{t('title')}</Header>
      <Main>
        <section className={cx('flex', 'flex-col', 'gap-10', 'p-4')}>
          <h1 className={cx('font-bold', 'text-4xl', 'text-center')}>{t('title')}</h1>
          <table className={cx('w-[600px]')}>
            <tbody>{assessmentSummaryComponents}</tbody>
          </table>
        </section>
      </Main>
    </>
  )
}
