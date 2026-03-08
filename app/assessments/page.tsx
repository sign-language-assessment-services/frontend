import { getAssessments } from '@/lib/apiClient'
import { auth } from '@/lib/auth'
import AssessmentSummaryComponent from '@/app/assessments/_components/AssessmentSummaryComponent'
import Header from '@/components/appshell/header/Header'
import Main from '@/components/appshell/main/Main'
import cx from 'classnames'
import { getTranslations } from 'next-intl/server'

export default async function Assessments() {
  const [t, assessments, session] = await Promise.all([
    getTranslations('Assessments'),
    getAssessments(),
    auth(),
  ])
  const isTestTaker = session?.user?.roles?.includes('test-taker') ?? false
  const assessmentSummaryComponents = assessments.map((assessment, i) => (
    <AssessmentSummaryComponent key={i} assessment={assessment} isTestTaker={isTestTaker} />
  ))

  return (
    <>
      <Header breadcrumbs={[{ label: t('title') }]} />
      <Main>
        <section className={cx('w-full', 'max-w-5xl', 'mx-auto', 'p-6', 'md:p-10')}>
          <ul
            className={cx(
              'list-none',
              'p-0',
              'm-0',
              'gap-6',
              assessments.length === 1
                ? 'flex justify-center'
                : cx(
                    'grid',
                    'grid-cols-1',
                    'sm:grid-cols-2',
                    'lg:grid-cols-3',
                    'justify-items-start',
                  ),
            )}
          >
            {assessmentSummaryComponents.map((el, i) => (
              <li
                key={i}
                className={cx(
                  assessments.length === 1 ? 'w-80 sm:w-96 flex-shrink-0' : 'w-full max-w-sm',
                )}
              >
                {el}
              </li>
            ))}
          </ul>
        </section>
      </Main>
    </>
  )
}
