import { getAssessmentById, scoreAssessment } from './assessmentsService'
import { mocked } from 'ts-jest/utils'
import axios from 'axios'
import { Assessment, Submission } from './models'

jest.mock('axios')

beforeAll(() => {
  mocked(axios.get).mockResolvedValue({
    data: {},
  })
})

describe('assessmentsService', () => {
  it('calls backend with correct URL', () => {
    getAssessmentById('1')

    expect(axios.get).toHaveBeenCalledWith('/api/assessments/1')
  })

  it('returns assessment provided by backend', async () => {
    const sampleAssessment: Assessment = {
      name: 'Sample Assessment',
      items: [],
    }

    mocked(axios.get).mockResolvedValue({
      data: sampleAssessment,
    })

    const actualAssessment = await getAssessmentById('1')
    expect(actualAssessment).toBe(sampleAssessment)
  })

  it('submits solutions to backend and returns score', async () => {
    const assessmentId = '42'
    const scoringResult = { score: 2 }
    mocked(axios.post).mockResolvedValue({
      data: scoringResult,
    })
    const submission: Submission = {
      0: [1],
      1: [0, 2],
    }

    // const x = { 0: [ false, true], 1: [ true, false, true } }

    const result = await scoreAssessment(assessmentId, submission)

    expect(axios.post).toHaveBeenCalledWith(
      `/api/assessments/${assessmentId}/submissions/`,
      submission,
    )
    expect(result).toBe(scoringResult)
  })
})
