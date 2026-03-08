import { getAssessments } from '@/lib/apiClient'
import AppShell from '@/components/appshell/AppShell'
import Header from '@/components/appshell/header/Header'
import Main from '@/components/appshell/main/Main'
import cx from 'classnames'
import { getTranslations } from 'next-intl/server'

export default async function TeacherAssessments() {
  const [assessments, t] = await Promise.all([getAssessments(), getTranslations('Navigation')])
  return (
    <AppShell>
      <Header breadcrumbs={[{ label: t('teacherSubmissions') }]} />
      <Main>
        <section className={cx('flex', 'flex-col', 'gap-10', 'p-10')}>
          <div className={cx('border', 'border-slate-200', 'overflow-hidden')}>
            <table className={cx('w-full', 'max-w-2xl')}>
              <tbody>
                {assessments.map((assessment) => (
                  <tr
                    key={assessment.id}
                    className={cx('border-b', 'border-slate-100', 'last:border-b-0', 'hover:bg-slate-50')}
                  >
                    <td className={cx('px-4', 'py-3')}>
                      <a
                        className={cx('block', 'text-blue-600', 'hover:underline')}
                        href={`/teacher/assessments/${assessment.id}/submissions`}
                      >
                        {assessment.name}
                      </a>
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
