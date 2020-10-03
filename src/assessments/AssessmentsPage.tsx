import React, { ReactElement, useState, useEffect } from 'react'
import { Assessment } from './models'
import { getAssessmentById } from './assessmentsService'
import MultipleChoiceItem from './MultipleChoiceItem'

export const AssessmentsPage = (): ReactElement | null => {
  const [assessment, setAssessment] = useState<Assessment>()
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0)
  const fetchAssessment = async () => {
    const assessment = await getAssessmentById('1')
    setAssessment(assessment)
  }
  const incrementItemIndex = () => {
    setCurrentItemIndex(currentItemIndex + 1)
  }

  useEffect(() => {
    fetchAssessment()
  }, [])

  if (assessment) {
    const hasNextItem = currentItemIndex < assessment.items.length - 1
    return (
      <>
        <h1>{assessment.name}</h1>
        {assessment.items.map((item, index) => (
          <MultipleChoiceItem item={item} visible={index === currentItemIndex} key={index} />
        ))}
        {hasNextItem ? <button onClick={incrementItemIndex}>Next</button> : null}
      </>
    )
  }
  return null
}
