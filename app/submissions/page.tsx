import { auth } from '@/lib/auth'
import { getAssessmentSubmissionById, getAssessmentSubmissions } from '@/lib/apiClient'
import AppShell from '@/components/appshell/AppShell'
import Header from '@/components/appshell/header/Header'
import Main from '@/components/appshell/main/Main'
import cx from 'classnames'
import FormattedDateTime from '@/components/formatting/FormattedDateTime'
import { getTranslations } from 'next-intl/server'

export default async function Submissions() {
  const session = await auth()
  if (!session?.user?.sub) {
    throw new Error('No user ID found in session')
  }
  const submissionIds = await getAssessmentSubmissions()
  const submissions = await Promise.all(
    submissionIds.map(({ id }) => getAssessmentSubmissionById(id)),
  )
  const t = await getTranslations('Submissions')
  return (
    <AppShell>
      <Header>{t('title')}</Header>

      <Main>
        <section className={cx('flex', 'flex-col', 'gap-10')}>
          <h1 className={cx('font-bold', 'text-4xl', 'text-center')}>{t('title')}</h1>
          <table
            className={cx('border', 'border-spacing-1', 'border-separate', 'border-slate-500')}
          >
            <thead>
              <tr>
                <th className={cx('border', 'p-2', 'text-left')}>{t('assessment')}</th>
                <th className={cx('border', 'p-2', 'text-left')}>{t('score')}</th>
                <th className={cx('border', 'p-2', 'text-left')}>{t('date')}</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className={cx('border', 'p-2')}>
                    <a href={`/assessments/${submission.assessment_id}/${submission.id}`}>
                      {t('show')}
                    </a>
                  </td>
                  <td className={cx('border', 'p-2')}>{submission.score ?? '–'}</td>
                  <td className={cx('border', 'p-2')}>
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
        </section>
      </Main>
    </AppShell>
  )
}
