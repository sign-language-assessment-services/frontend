import { auth } from '@/lib/auth'
import {
  getAssessmentById,
  getAssessments,
  getAssessmentSubmissionById,
  getAssessmentSubmissions,
} from '@/lib/apiClient'
import AppShell from '@/components/appshell/AppShell'
import Header from '@/components/appshell/header/Header'
import Main from '@/components/appshell/main/Main'
import cx from 'classnames'
import FormattedDateTime from '@/components/formatting/FormattedDateTime'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export default async function Submissions() {
  const session = await auth()
  if (!session?.user?.sub) {
    throw new Error('No user ID found in session')
  }
  const submissionIds = await getAssessmentSubmissions()
  const submissions = await Promise.all(
    submissionIds.map(({ id }) => getAssessmentSubmissionById(id)),
  )
  const assessmentSummaries = await getAssessments()
  const assessmentsById = Object.fromEntries(
    await Promise.all(
      assessmentSummaries.map(async (summary) => [summary.id, await getAssessmentById(summary.id)]),
    ),
  )

  const [t, tNav] = await Promise.all([
    getTranslations('Submissions'),
    getTranslations('Navigation'),
  ])
  return (
    <AppShell>
      <Header breadcrumbs={[{ label: tNav('myResults') }]} />
      <Main>
        <section className={cx('flex', 'flex-col', 'gap-10', 'p-10')}>
          <div className={cx('border', 'border-slate-200', 'overflow-hidden')}>
            <table className={cx('w-full', 'max-w-3xl')}>
              <thead>
                <tr className={cx('bg-slate-50', 'border-b', 'border-slate-200')}>
                  <th className={cx('px-4', 'py-3', 'text-left', 'text-sm', 'font-medium', 'text-slate-700')}>
                    {t('assessment')}
                  </th>
                  <th className={cx('px-4', 'py-3', 'text-left', 'text-sm', 'font-medium', 'text-slate-700')}>
                    {t('score')}
                  </th>
                  <th className={cx('px-4', 'py-3', 'text-left', 'text-sm', 'font-medium', 'text-slate-700')}>
                    {t('date')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className={cx('border-b', 'border-slate-100', 'last:border-b-0', 'hover:bg-slate-50')}
                  >
                    <td className={cx('px-4', 'py-3')}>
                      {assessmentsById[submission.assessment_id].name}
                    </td>
                    <td className={cx('px-4', 'py-3')}>{submission.score ?? '–'}</td>
                    <td className={cx('px-4', 'py-3')}>
                    {submission.finished_at ? (
                      <FormattedDateTime value={submission.finished_at} />
                    ) : (
                      <>–</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </section>
      </Main>
    </AppShell>
  )
}
