import { getAssessments } from '@/lib/apiClient'
import AssessmentSummaryComponent from '@/app/assessments/_components/AssessmentSummaryComponent'
import Header from '@/components/appshell/header/Header'
import Main from '@/components/appshell/main/Main'
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
      <Header breadcrumbs={[{ label: t('title') }]} />
      <Main>
        <section className={cx('w-full', 'max-w-5xl', 'mx-auto', 'p-6', 'md:p-10')}>
          <ul
            className={cx(
              'grid',
              'grid-cols-1',
              'sm:grid-cols-2',
              'lg:grid-cols-3',
              'gap-6',
              'list-none',
              'p-0',
              'm-0',
              'justify-items-start',
            )}
          >
            {assessmentSummaryComponents.map((el, i) => (
              <li key={i} className="w-full max-w-sm">
                {el}
              </li>
            ))}
          </ul>
        </section>
      </Main>
    </>
  )
}
