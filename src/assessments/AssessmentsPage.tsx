import React, { ReactElement, useState } from 'react'
import { Assessment, ScoringResult, Submission } from './models'
import ScoringResultComponent from './ScoringResult'
import useFetchData from '../useFetch'
import { useFetchWithAuth } from '../useFetchWithAuth'
import { AssessmentsForm } from './AssessmentsForm'
import { ErrorMessage } from './ErrorMessage'
import { LoadingIndicator } from './LoadingIndicator'

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
    return <LoadingIndicator />
  }
  return (
    <div className="font-sans absolute inset-0 flex flex-col items-stretch">
      <main className="flex flex-col flex-grow text-2xl">
        {scoringResult ? (
          <ScoringResultComponent scoringResult={scoringResult} />
        ) : (
          <AssessmentsForm assessment={assessment} onSubmit={sendSubmission} />
        )}
      </main>
    </div>
  )
}
