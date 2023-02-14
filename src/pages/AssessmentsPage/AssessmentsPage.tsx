import React, { ReactElement, useState } from 'react'
import { Assessment, ScoringResult, Submission } from './models'
import ScoringResultComponent from './ScoringResult/ScoringResult'
import useFetchData from '../../useFetch'
import { useFetchWithAuth } from '../../useFetchWithAuth'
import { AssessmentsForm } from './AssessmentsForm/AssessmentsForm'
import { ErrorMessage } from '../../components/ErrorMessage'

const assessmentId = '1'
export const AssessmentsPage = (): ReactElement | null => {
  const fetch = useFetchWithAuth()
  const { data: assessment, error } = useFetchData<Assessment>(`/api/assessments/${assessmentId}`)

  const [scoringResult, setScoringResult] = useState<ScoringResult>()
  const sendSubmission = async (submission: Submission) => {
    const result = await fetch<ScoringResult>(`/api/assessments/${assessmentId}/submissions/`, {
      method: 'POST',
      body: JSON.stringify(submission),
      headers: { 'Content-Type': 'application/json' },
    })
    setScoringResult(result)
  }

  if (error) {
    return <ErrorMessage error={error} />
  }
  if (!assessment) {
    return null
  }
  if (scoringResult) {
    return <ScoringResultComponent assessment={assessment} scoringResult={scoringResult} />
  }
  return <AssessmentsForm assessment={assessment} onSubmit={sendSubmission} />
}
