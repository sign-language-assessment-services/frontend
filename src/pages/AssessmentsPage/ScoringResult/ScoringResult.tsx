import { Assessment, ScoringResult as ScoringResultModel } from '../models'

import React, { ReactElement } from 'react'
import { Header } from '../../../components/layout/Header'
import { Footer } from '../../../components/layout/Footer'
import { PageContainer } from '../../../components/layout/PageContainer'
import { Main } from '../../../components/layout/Main'
import { Button } from '../../../components/Button'

interface Props {
  assessment: Assessment
  scoringResult: ScoringResultModel
}

const ScoringResult = ({ assessment, scoringResult: { score } }: Props): ReactElement => (
  <PageContainer>
    <Header>{assessment.name}</Header>
    <Main>
      <div className="flex flex-col gap-6 items-center">
        <span>Sie haben</span>
        <span className="text-6xl font-bold">{score} Punkt(e)</span>
        <span>erreicht</span>
      </div>
    </Main>
    <Footer>
      <Button onClick={() => window.location.reload()} icon="reload">
        Test wiederholen
      </Button>
    </Footer>
  </PageContainer>
)

export default ScoringResult
