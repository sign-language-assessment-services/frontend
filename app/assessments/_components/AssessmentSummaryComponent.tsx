import cx from 'classnames'
import AssessmentSummary from '@/lib/models'

export default function AssessmentSummaryComponent({
  assessment,
}: {
  assessment: AssessmentSummary
}) {
  const url = `/assessments/${assessment.id}`
  return (
    <tr className={cx(['hover:bg-blue-100', 'hover:cursor-pointer'])}>
      <td className={cx('text-center', 'flex')}>
        <a className={cx('flex-1')} href={url}>
          {assessment.name}
        </a>
      </td>
    </tr>
  )
}
