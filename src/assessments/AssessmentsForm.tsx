import { Assessment, Submission } from './models'
import React, { useMemo, useState } from 'react'

interface Props {
  assessment: Assessment
  onSubmit: (_: Submission) => void
}

export const AssessmentsForm: React.FC<Props> = ({ assessment, onSubmit }) => {
  const initialState = useMemo(
    () => Object.fromEntries(assessment.items.map((_, index) => [index, []])),
    [assessment.items.length],
  )

  const [submission, setSubmission] = useState<Submission>(initialState)
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0)
  const incrementItemIndex = () => {
    setCurrentItemIndex(currentItemIndex + 1)
  }
  const hasNextItem = currentItemIndex < assessment.items.length - 1

  const handleChange = (itemIndex: string, choiceIndex: string) => {
    setSubmission({
      ...submission,
      [itemIndex]: submission[itemIndex].includes(choiceIndex)
        ? submission[itemIndex].filter((i) => i !== choiceIndex)
        : [...submission[itemIndex], choiceIndex],
    })
  }

  return (
    <form
      onSubmit={(e) => {
        onSubmit(submission)
        e.preventDefault()
      }}
    >
      <h2>{assessment.name}</h2>
      {assessment.items.map((item, itemIndex) => (
        <div key={itemIndex} hidden={itemIndex !== currentItemIndex}>
          <h3>{item.description}</h3>
          {item.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <label>
                <input
                  type="checkbox"
                  checked={
                    submission[itemIndex.toString()]?.includes(choiceIndex.toString()) ?? false
                  }
                  onChange={() => handleChange(itemIndex.toString(), choiceIndex.toString())}
                />
                {choice.label}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={incrementItemIndex} hidden={!hasNextItem}>
        Next
      </button>
      <input type="submit" hidden={hasNextItem} />
    </form>
  )
}
