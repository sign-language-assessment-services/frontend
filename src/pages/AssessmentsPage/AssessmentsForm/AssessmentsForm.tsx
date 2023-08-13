import React, { FormEventHandler, useMemo, useState } from 'react'
import { ItemComponent } from './ItemComponent/ItemComponent'
import { Button } from '../../../components/Button'
import { Header } from '../../../components/layout/Header'
import { Footer } from '../../../components/layout/Footer'
import { PageContainer } from '../../../components/layout/PageContainer'
import { Main } from '../../../components/layout/Main'
import { useNavigate } from 'react-router'
import { Assessment } from '../models/assessment'
import { Submission } from '../models/submission'

interface Props {
  assessment: Assessment
  onSubmit: (_: Submission) => void
}

export const AssessmentsForm: React.FC<Props> = ({ assessment: { items, name }, onSubmit }) => {
  const initialState = useMemo(
    () => Object.fromEntries(items.map((item) => [item.position, []])),
    [items.length],
  )
  const navigate = useNavigate()

  const [submission, setSubmission] = useState<Submission>(initialState)
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0)

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

      <Main center>
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
          onClick={() => setCurrentItemIndex(currentItemIndex - 1)}
          disabled={currentItemIndex === 0}
          icon="prev"
          iconPosition="left"
        >
          Zurück
        </Button>
        <Button
          onClick={() => setCurrentItemIndex(currentItemIndex + 1)}
          disabled={currentItemIndex === items.length - 1}
          icon="next"
          iconPosition="right"
        >
          Weiter
        </Button>
        <Button type="submit" form="assessmentForm" disabled={currentItemIndex < items.length - 1}>
          Test absenden
        </Button>
        <Button onClick={() => navigate('/')} form="assessmentForm" style="WARNING">
          Abbrechen
        </Button>
      </Footer>
    </PageContainer>
  )
}
