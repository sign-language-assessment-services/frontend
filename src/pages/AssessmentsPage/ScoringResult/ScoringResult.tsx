import React, { ReactElement } from 'react'
import { Header } from '../../../components/layout/Header'
import { Footer } from '../../../components/layout/Footer'
import { PageContainer } from '../../../components/layout/PageContainer'
import { Main } from '../../../components/layout/Main'
import { Button } from '../../../components/Button'
import { useNavigate } from 'react-router'
import { Assessment } from '../models/assessment'
import { ScoringResult as ScoringResultModel } from '../models/scoringResult'

interface Props {
  assessment: Assessment
  scoringResult: ScoringResultModel
}

const ScoringResult = ({
  assessment,
  scoringResult: { points, maximum_points, percentage },
}: Props): ReactElement => {
  const navigate = useNavigate()
  return (
    <PageContainer>
      <Header>{assessment.name}</Header>
      <Main center>
        <div className="flex flex-col gap-6 items-center">
          <span>Sie haben</span>
          <span className="text-6xl font-bold">
            {points}
            {' '}/{' '}
            {maximum_points} Punkte ({percentage * 100}
            {' '}%)
          </span>
          <span>erreicht</span>
        </div>
      </Main>
      <Footer>
        <Button onClick={() => window.location.reload()} icon="reload">
          Wiederholen
        </Button>
        <Button onClick={() => navigate('/assessments')}>Testübersicht</Button>
      </Footer>
    </PageContainer>
  )
}

export default ScoringResult
