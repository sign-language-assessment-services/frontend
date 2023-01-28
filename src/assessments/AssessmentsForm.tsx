import { Form, Formik } from 'formik'
import { Assessment, Choice, Item, Submission } from './models'
import MultipleChoiceItem from './MultipleChoiceItem'
import React, { useState } from 'react'

interface Props {
  assessment: Assessment
  onSubmit: (_: Submission) => void
}

export const AssessmentsForm: React.FC<Props> = ({ assessment, onSubmit }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0)
  const incrementItemIndex = () => {
    setCurrentItemIndex(currentItemIndex + 1)
  }
  const hasNextItem = currentItemIndex < assessment.items.length - 1
  return (
    <>
      <h1>{assessment.name}</h1>
      <Formik
        initialValues={initialValues(assessment.items)}
        onSubmit={async (formValues) => {
          onSubmit(toSubmission(formValues))
        }}
      >
        <Form>
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
    </>
  )
}

const toSubmission = (formValues: Record<string, Record<string, boolean>>): Submission =>
  Object.fromEntries(
    Object.entries(formValues).map(([itemId, choices]) => [itemId, selectedChoiceIds(choices)]),
  )

const selectedChoiceIds = (choiceIdToSelected: Record<string, boolean>): string[] =>
  Object.entries(choiceIdToSelected)
    .filter(([, selected]) => selected)
    .map(([choiceId]) => choiceId)

const initialValues = (items: Item[]): Record<string, Record<string, boolean>> =>
  Object.fromEntries(items.map((item, index) => [index.toString(), setAllToFalse(item.choices)]))

const setAllToFalse = (choices: Choice[]): Record<string, boolean> =>
  Object.fromEntries(choices.map((_, index) => [index.toString(), false]))
