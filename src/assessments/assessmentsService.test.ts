import { getAssessmentById, scoreAssessment } from './assessmentsService'
import { Assessment, Submission } from './models'
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks()
})

describe('assessmentsService', () => {
  it('returns assessment provided by backend', async () => {
    const sampleAssessment: Assessment = {
      name: 'Sample Assessment',
      items: [],
    }
    fetchMock.mockResponseOnce(JSON.stringify(sampleAssessment))

    const actualAssessment = await getAssessmentById('1')

    expect(fetch).toHaveBeenCalledWith('/api/assessments/1')
    expect(actualAssessment).toEqual(sampleAssessment)
  })

  it('submits solutions to backend and returns score', async () => {
    const assessmentId = '42'
    const scoringResult = { score: 2 }
    fetchMock.mockResponseOnce(JSON.stringify(scoringResult))
    const submission: Submission = {
      0: ['1'],
      1: ['0', '2'],
    }

    const result = await scoreAssessment(assessmentId, submission)

    expect(fetch).toHaveBeenCalledWith(
      `/api/assessments/${assessmentId}/submissions/`,
        {
          method: 'POST',
          body: JSON.stringify(submission),
          headers: {'Content-Type': 'application/json'},
        }
    )
    expect(result).toEqual(scoringResult)
  })
})
