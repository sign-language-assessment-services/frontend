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
  const [assessment, results, t] = await Promise.all([
    getAssessmentById(assessmentId),
    getAssessmentResults(assessmentId),
    getTranslations('TeacherSubmissions'),
  ])

  const exercises = assessment.tasks.filter((task) => task.task_type === 'exercise')

  return (
    <AppShell>
      <Header>
        {assessment.name} – {t('title')}
      </Header>
      <Main>
        <section className={cx('flex', 'flex-col', 'gap-10', 'p-10')}>
          <h1 className={cx('font-bold', 'text-4xl', 'text-center')}>
            {assessment.name} – {t('title')}
          </h1>
          {results.submissions.length === 0 ? (
            <p className={cx('text-center', 'text-gray-500')}>{t('noSubmissions')}</p>
          ) : (
            <div className={cx('overflow-x-auto')}>
              <table
                className={cx(
                  'border',
                  'border-spacing-1',
                  'border-separate',
                  'border-slate-500',
                  'w-full',
                )}
              >
                <thead>
                  <tr>
                    <th className={cx('border', 'border-slate-500', 'p-2', 'text-left')}>
                      {t('student')}
                    </th>
                    {exercises.map((exercise, index) => (
                      <th
                        key={exercise.id}
                        className={cx('border', 'border-slate-500', 'p-2', 'text-left')}
                      >
                        {t('task', { number: index + 1 })}
                      </th>
                    ))}
                    <th
                      className={cx(
                        'border',
                        'border-slate-500',
                        'p-2',
                        'text-left',
                        'font-bold',
                      )}
                    >
                      {t('total')}
                    </th>
                    <th className={cx('border', 'border-slate-500', 'p-2', 'text-left')}>
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
                      <tr key={submission.submission_id}>
                        <td className={cx('border', 'border-slate-500', 'p-2', 'font-medium')}>
                          {submission.user_id}
                        </td>
                        {exercises.map((exercise) => (
                          <td
                            key={exercise.id}
                            className={cx('border', 'border-slate-500', 'p-2')}
                          >
                            {scoreByExerciseId[exercise.id] ?? '–'}
                          </td>
                        ))}
                        <td
                          className={cx(
                            'border',
                            'border-slate-500',
                            'p-2',
                            'font-bold',
                          )}
                        >
                          {submission.total_score ?? '–'}
                        </td>
                        <td className={cx('border', 'border-slate-500', 'p-2')}>
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
