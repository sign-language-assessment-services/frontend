import { getAssessmentById, getAssessmentResults } from '@/lib/apiClient'
import AppShell from '@/components/appshell/AppShell'
import Header from '@/components/appshell/header/Header'
import Main from '@/components/appshell/main/Main'
import FormattedDateTime from '@/components/formatting/FormattedDateTime'
import cx from 'classnames'
import { getTranslations } from 'next-intl/server'
import { ExerciseScore } from '@/lib/models'

export default async function TeacherSubmissions({
  params,
}: {
  params: Promise<{ assessmentId: string }>
}) {
  const { assessmentId } = await params
  const [assessment, results, t, tNav] = await Promise.all([
    getAssessmentById(assessmentId),
    getAssessmentResults(assessmentId),
    getTranslations('TeacherSubmissions'),
    getTranslations('Navigation'),
  ])

  const exercises = assessment.tasks.filter((task) => task.task_type === 'exercise')

  return (
    <AppShell>
      <Header
        breadcrumbs={[
          { label: tNav('teacherSubmissions'), href: '/teacher/assessments' },
          { label: assessment.name },
        ]}
      />
      <Main>
        <section className={cx('flex', 'flex-col', 'gap-10', 'p-10')}>
          {results.submissions.length === 0 ? (
            <p className={cx('text-center', 'text-gray-500')}>{t('noSubmissions')}</p>
          ) : (
            <div className={cx('border', 'border-slate-200', 'overflow-hidden', 'overflow-x-auto')}>
              <table className={cx('w-full')}>
                <thead>
                  <tr className={cx('bg-slate-50', 'border-b', 'border-slate-200')}>
                    <th className={cx('px-4', 'py-3', 'text-left', 'text-sm', 'font-medium', 'text-slate-700')}>
                      {t('student')}
                    </th>
                    {exercises.map((exercise, index) => (
                      <th
                        key={exercise.id}
                        className={cx('px-4', 'py-3', 'text-left', 'text-sm', 'font-medium', 'text-slate-700')}
                      >
                        {t('task', { number: index + 1 })}
                      </th>
                    ))}
                    <th
                      className={cx(
                        'px-4',
                        'py-3',
                        'text-left',
                        'text-sm',
                        'font-semibold',
                        'text-slate-700',
                      )}
                    >
                      {t('total')}
                    </th>
                    <th className={cx('px-4', 'py-3', 'text-left', 'text-sm', 'font-medium', 'text-slate-700')}>
                      {t('date')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.submissions.map((submission) => {
                    const scoreByExerciseId = Object.fromEntries(
                      submission.exercise_scores.map((es: ExerciseScore) => [
                        es.exercise_id,
                        es.score,
                      ]),
                    )
                    return (
                      <tr
                        key={submission.submission_id}
                        className={cx('border-b', 'border-slate-100', 'last:border-b-0', 'hover:bg-slate-50')}
                      >
                        <td className={cx('px-4', 'py-3', 'font-medium')}>
                          {submission.user_id}
                        </td>
                        {exercises.map((exercise) => (
                          <td key={exercise.id} className={cx('px-4', 'py-3')}>
                            {scoreByExerciseId[exercise.id] ?? '–'}
                          </td>
                        ))}
                        <td className={cx('px-4', 'py-3', 'font-semibold')}>
                          {submission.total_score ?? '–'}
                        </td>
                        <td className={cx('px-4', 'py-3')}>
                          <FormattedDateTime value={submission.finished_at} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </Main>
    </AppShell>
  )
}
