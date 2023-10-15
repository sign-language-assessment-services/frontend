import React, { ReactElement } from 'react'
import { PageContainer } from '../../components/layout/PageContainer'
import { Header } from '../../components/layout/Header'
import { Main } from '../../components/layout/Main'
import { Submission } from './models/submission'
import useFetchData from '../../useFetch'
import cx from 'classnames'
import { useAuthentication } from '../../auth/useAuthentication'

export const SubmissionsListPage = (): ReactElement | null => {
  const { user } = useAuthentication()
  const { data: submissions } = useFetchData<Submission[]>(`/api/submissions/?user_id=${user?.id}`)
  if (submissions === undefined) {
    return null
  }

  return (
    <PageContainer>
      <Header>Ergebnisse</Header>

      <Main>
        <section className={cx('flex', 'flex-col', 'gap-10')}>
          <h1 className={cx('font-bold', 'text-4xl', 'text-center')}>Ergebnisse</h1>
          <table
            className={cx('border', 'border-spacing-1', 'border-separate', 'border-slate-500')}
          >
            <thead>
              <tr>
                <th className={cx('border', 'p-2', 'text-left')}>User</th>
                <th className={cx('border', 'p-2', 'text-left')}>Test</th>
                <th className={cx('border', 'p-2', 'text-left')}>Punkte</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className={cx('border', 'p-2')}>{submission.user_id}</td>
                  <td className={cx('border', 'p-2')}>{submission.assessment_id}</td>
                  <td className={cx('border', 'p-2')}>{submission.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Main>
    </PageContainer>
  )
}
