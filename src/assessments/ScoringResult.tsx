import { ScoringResult as ScoringResultModel } from './models'

import React, { ReactElement } from 'react'

interface Props {
  scoringResult: ScoringResultModel
}

const ScoringResult = ({ scoringResult }: Props): ReactElement => (
  <>Your result: {scoringResult.score}</>
)

export default ScoringResult
