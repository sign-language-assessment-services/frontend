import { Assessment, Submission } from './models'
import React, { FormEventHandler, useMemo, useState } from 'react'
import { ItemComponent } from './ItemComponent'
import { Button } from '../components/Button'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { PageContainer } from '../components/layout/PageContainer'
import { Main } from '../components/layout/Main'

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
    <PageContainer>
      <Header>
        {name} – Aufgabe {currentItemIndex + 1} / {items.length}
      </Header>

      <Main>
        <form id="assessmentForm" onSubmit={onFormSubmit}>
          <ItemComponent
            selectedChoices={submission[currentItemIndex.toString()]}
            handleChange={(choiceIndex: string) =>
              handleChange(currentItemIndex.toString(), choiceIndex)
            }
            item={items[currentItemIndex]}
          />
        </form>
      </Main>
      <Footer>
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
        <Button type="submit" form="assessmentForm" disabled={hasNextItem}>
          Test absenden
        </Button>
      </Footer>
    </PageContainer>
  )
}
