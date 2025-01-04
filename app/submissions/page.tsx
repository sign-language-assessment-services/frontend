import { auth } from '@/lib/auth'
import { getSubmissions } from '@/lib/apiClient'
import { PageContainer } from '@/components/layout/PageContainer'
import { Header } from '@/components/layout/header/Header'
import { Main } from '@/components/layout/Main'
import cx from 'classnames'
import FormattedPercentage from '@/components/FormattedPercentage'
import FormattedDateTime from '@/components/FormattedDateTime'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export default async function Submissions() {
  const session = await auth()
  if (!session?.user?.sub) {
    throw new Error('No user ID found in session')
  }
  const submissions = await getSubmissions(session?.user?.sub)
  const t = await getTranslations('Submissions')
  return (
    <PageContainer>
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
                  <td className={cx('border', 'p-2')}>{submission.assessment_id}</td>
                  <td className={cx('border', 'p-2')}>
                    {submission.points}
                    {' '}/{' '}
                    {submission.maximum_points} (
                    <FormattedPercentage value={submission.percentage} />)
                  </td>
                  <td className={cx('border', 'p-2')}>
                    <FormattedDateTime value={submission.created_at} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Main>
    </PageContainer>
  )
}
