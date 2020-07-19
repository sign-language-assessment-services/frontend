import { getAssessmentById } from './assessmentsService'
import { mocked } from 'ts-jest/utils'
import axios from 'axios'
import { Assessment } from './models'

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
})
