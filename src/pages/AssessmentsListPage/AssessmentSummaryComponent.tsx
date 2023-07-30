import React from 'react'
import AssessmentSummary from './models/AssessmentSummary'
import cx from 'classnames'
import { useNavigate } from 'react-router'

export function AssessmentSummaryComponent({ assessment }: { assessment: AssessmentSummary }) {
  const navigate = useNavigate()
  const url = `/assessments/${assessment.id}`
  return (
    <tr
      className={cx(['hover:bg-blue-100', 'hover:cursor-pointer'])}
      onClick={() => navigate(url, { replace: false })}
    >
      <td className="text-center">
        <a href={url}>{assessment.name}</a>
      </td>
    </tr>
  )
}
