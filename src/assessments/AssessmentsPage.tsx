import React, { ReactElement, useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { Assessment } from './models'
import { getAssessmentById, scoreAssessment } from './assessmentsService'
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

    const initialValues: Record<string, Record<string, boolean>> = {}
    for (const itemIndex in assessment.items) {
      const choices: Record<string, boolean> = {}
      for (const choiceIndex in assessment.items[itemIndex].choices) {
        choices[choiceIndex] = false
      }
      initialValues[itemIndex] = choices
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const transformedValues: Record<string, string[]> = {}

          for (const itemId in values) {
            const selectedChoices: string[] = []
            for (const choiceId in values[itemId]) {
              if (values[itemId][choiceId]) {
                selectedChoices.push(choiceId)
              }
            }
            transformedValues[itemId] = selectedChoices
          }
          scoreAssessment('1', transformedValues)
        }}
      >
        <Form>
          <h1>{assessment.name}</h1>
          {assessment.items.map((item, index) => (
            <MultipleChoiceItem
              item={item}
              itemId={index.toString()}
              visible={index === currentItemIndex}
              key={index}
            />
          ))}
          <button type="button" onClick={incrementItemIndex} hidden={!hasNextItem}>
            Next
          </button>

          <button type="submit" hidden={hasNextItem}>
            Submit
          </button>
        </Form>
      </Formik>
    )
  }
  return null
}
