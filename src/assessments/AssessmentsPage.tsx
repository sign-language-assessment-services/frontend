import React, { ReactElement, useState, useEffect } from 'react'
import { Assessment } from './models'
import { getAssessmentById } from './assessmentsService'

export const AssessmentsPage = (): ReactElement | null => {
  const [assessment, setAssessment] = useState<Assessment>()
  const fetchAssessment = async () => {
    const assessment = await getAssessmentById('1')
    setAssessment(assessment)
  }
  useEffect(() => {
    fetchAssessment()
  }, [])

  if (assessment) {
    return (
      <>
        <h1>{assessment.name}</h1>
        {assessment.items.map((item, index) => (
          <div key={index}>
            <h3>{item.description}</h3>
            <ul>
              {item.choices.map((choice, index) => (
                <li key={index}>{choice.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </>
    )
  }
  return null
}
