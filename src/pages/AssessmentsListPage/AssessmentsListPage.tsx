import React, { ReactElement } from 'react'
import useFetchData from '../../useFetch'
import AssessmentSummary from './models/AssessmentSummary'
import { Header } from '../../components/layout/Header'
import { PageContainer } from '../../components/layout/PageContainer'
import { Main } from '../../components/layout/Main'
import { AssessmentSummaryComponent } from './AssessmentSummaryComponent'
import cx from 'classnames'

export const AssessmentsListPage = (): ReactElement | null => {
  const { data: assessments } = useFetchData<AssessmentSummary[]>(`/api/assessments/`)
  if (assessments === undefined) {
    return null
  }
  const assessmentSummaryComponents = assessments.map((assessment) => (
    <AssessmentSummaryComponent key={assessment.id} assessment={assessment} />
  ))

  return (
    <PageContainer>
      <Header>Tests</Header>

      <Main>
        <section className={cx('flex', 'flex-col', 'gap-10')}>
          <h1 className={cx('font-bold', 'text-4xl', 'text-center')}>Tests</h1>
          <table className={cx('w-[600px]')}>
            <tbody>{assessmentSummaryComponents}</tbody>
          </table>
        </section>
      </Main>
    </PageContainer>
  )
}
