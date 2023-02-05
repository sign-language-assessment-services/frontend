import { Assessment, Submission } from './models'
import React, { FormEventHandler, useMemo, useState } from 'react'
import { ItemComponent } from './ItemComponent'
import { Button } from '../components/Button'
import { UserPanel } from '../components/UserPanel'
import cx from 'classnames'

interface Props {
  assessment: Assessment
  onSubmit: (_: Submission) => void
}

export const AssessmentsForm: React.FC<Props> = ({ assessment: { items, name }, onSubmit }) => {
  const initialState = useMemo(
    () => Object.fromEntries(items.map((_, index) => [index, []])),
    [items.length],
  )

  const [submission, setSubmission] = useState<Submission>(initialState)
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0)

  const decrementItemIndex = () => {
    setCurrentItemIndex(currentItemIndex - 1)
  }

  const incrementItemIndex = () => {
    setCurrentItemIndex(currentItemIndex + 1)
  }
  const hasPreviousItem = currentItemIndex > 0
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
    <>
      <header
        className={cx(
          'flex',
          'h-12',
          'text-center',
          'items-center',
          'justify-between',
          'bg-blue-100',
          'border-b-4',
          'border-blue-200',
          'text-lg',
          'p-6',
          'dark:bg-gray-900',
          'dark:text-amber-400',
          'dark:border-gray-700',
        )}
      >
        <h2 className="shrink-0">
          {name} – Aufgabe {currentItemIndex + 1} / {items.length}
        </h2>
        <h2 className="shrink-0">
          <UserPanel />
        </h2>
      </header>
      <form onSubmit={onFormSubmit} className="flex flex-col flex-grow">
        <ItemComponent
          selectedChoices={submission[currentItemIndex.toString()]}
          handleChange={(choiceIndex: string) =>
            handleChange(currentItemIndex.toString(), choiceIndex)
          }
          item={items[currentItemIndex]}
        />
        <footer
          className={cx(
            'flex',
            'justify-center',
            'gap-6',
            'items-center',
            'h-32',
            'border-t-4',
            'p-4',
            'bg-blue-100',
            'border-blue-200',
            'dark:bg-gray-900',
            'dark:text-amber-500',
            'dark:border-gray-700',
          )}
        >
          <Button
            onClick={decrementItemIndex}
            disabled={!hasPreviousItem}
            icon="prev"
            iconPosition="left"
          >
            Zurück
          </Button>
          <Button
            onClick={incrementItemIndex}
            disabled={!hasNextItem}
            icon="next"
            iconPosition="right"
          >
            Weiter
          </Button>
          <Button type="submit" disabled={hasNextItem}>
            Test absenden
          </Button>
        </footer>
      </form>
    </>
  )
}
