import React, { ReactElement, useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { Assessment, Choice, Item, ScoringResult, Submission } from './models'
import { getAssessmentById, scoreAssessment } from './assessmentsService'
import MultipleChoiceItem from './MultipleChoiceItem'
import ScoringResultComponent from './ScoringResult'

export const AssessmentsPage = (): ReactElement | null => {
  const [assessment, setAssessment] = useState<Assessment>()
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0)
  const [scoringResult, setScoringResult] = useState<ScoringResult>()
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
        <Formik
          initialValues={initialValues(assessment.items)}
          onSubmit={async (formValues) => {
            const result = await scoreAssessment('1', toSubmission(formValues))
            setScoringResult(result)
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
        {scoringResult ? <ScoringResultComponent scoringResult={scoringResult} /> : undefined}
      </>
    )
  }
  return null
}

const initialValues = (items: Item[]): Record<string, Record<string, boolean>> =>
  Object.fromEntries(items.map((item, index) => [index.toString(), setAllToFalse(item.choices)]))

const setAllToFalse = (choices: Choice[]): Record<string, boolean> =>
  Object.fromEntries(choices.map((_, index) => [index.toString(), false]))

const toSubmission = (formValues: Record<string, Record<string, boolean>>): Submission =>
  Object.fromEntries(
    Object.entries(formValues).map(([itemId, choices]) => [itemId, selectedChoiceIds(choices)]),
  )

const selectedChoiceIds = (choiceIdToSelected: Record<string, boolean>): string[] =>
  Object.entries(choiceIdToSelected)
    .filter(([, selected]) => selected)
    .map(([choiceId]) => choiceId)
