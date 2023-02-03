import { Item, Submission } from './models'
import React, { FormEventHandler, useMemo, useState } from 'react'
import { ItemComponent } from './ItemComponent'

interface Props {
  items: Item[]
  onSubmit: (_: Submission) => void
}

export const AssessmentsForm: React.FC<Props> = ({ items, onSubmit }) => {
  const initialState = useMemo(
    () => Object.fromEntries(items.map((_, index) => [index, []])),
    [items.length],
  )

  const [submission, setSubmission] = useState<Submission>(initialState)
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0)
  const incrementItemIndex = () => {
    setCurrentItemIndex(currentItemIndex + 1)
  }
  const hasNextItem = currentItemIndex < items.length - 1
  const onFormSubmit: FormEventHandler = (e) => {
    onSubmit(submission)
    e.preventDefault()
  }
  const handleChange = (itemIndex: string, choiceIndex: string) => {
    setSubmission({
      ...submission,
      [itemIndex]: submission[itemIndex].includes(choiceIndex)
        ? submission[itemIndex].filter((i) => i !== choiceIndex)
        : [...submission[itemIndex], choiceIndex],
    })
  }

  return (
    <form onSubmit={onFormSubmit}>
      {items.map((item, itemIndex) => {
        return (
          <ItemComponent
            key={itemIndex}
            hidden={itemIndex !== currentItemIndex}
            selectedChoices={submission[itemIndex.toString()]}
            handleChange={(choiceIndex: string) => handleChange(itemIndex.toString(), choiceIndex)}
            item={item}
          />
        )
      })}
      <button type="button" onClick={incrementItemIndex} hidden={!hasNextItem}>
        Next
      </button>
      <input type="submit" hidden={hasNextItem} />
    </form>
  )
}
