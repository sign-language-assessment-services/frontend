import React, { FormEventHandler, useMemo, useState } from 'react'
import { Button } from '../../../components/Button'
import { Header } from '../../../components/layout/Header'
import { Footer } from '../../../components/layout/Footer'
import { PageContainer } from '../../../components/layout/PageContainer'
import { Main } from '../../../components/layout/Main'
import { useNavigate } from 'react-router'
import { Assessment } from '../models/assessment'
import { Submission } from '../models/submission'
import { isMultipleChoice } from './ItemComponent/typeGuards'
import { ItemComponent } from './ItemComponent/ItemComponent'

interface Props {
  assessment: Assessment
  onSubmit: (_: Submission) => void
}

export const AssessmentsForm: React.FC<Props> = ({ assessment: { items, name }, onSubmit }) => {
  const multipleChoiceItems = items.filter(isMultipleChoice)
  const initialState = useMemo(
    () => Object.fromEntries(multipleChoiceItems.map((item) => [item.position, []])),
    [multipleChoiceItems],
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

  const isLastPage = currentItemIndex === items.length - 1
  const isFirstPage = currentItemIndex === 0

  return (
    <PageContainer>
      <Header>
        {name} – <span className="lg:inline">Seite</span> {currentItemIndex + 1} / {items.length}
      </Header>

      <Main center>
        <form id="assessmentForm" className="h-full w-full" onSubmit={onFormSubmit}>
          <ItemComponent
            item={items[currentItemIndex]}
            selectedChoices={submission[currentItemIndex.toString()]}
            handleChange={(choiceIndex: string) =>
              handleChange(currentItemIndex.toString(), choiceIndex)
            }
          />
        </form>
      </Main>
      <Footer>
        <Button
          onClick={() => setCurrentItemIndex(currentItemIndex - 1)}
          disabled={isFirstPage}
          icon="prev"
          iconPosition="left"
        >
          Zurück
        </Button>
        {isLastPage ? null : (
          <Button
            onClick={() => setCurrentItemIndex(currentItemIndex + 1)}
            disabled={currentItemIndex === items.length - 1}
            icon="next"
            iconPosition="right"
          >
            Weiter
          </Button>
        )}
        {isLastPage ? (
          <Button type="submit" form="assessmentForm">
            Test absenden
          </Button>
        ) : null}
        <Button onClick={() => navigate('/')} form="assessmentForm" style="WARNING">
          Abbrechen
        </Button>
      </Footer>
    </PageContainer>
  )
}
