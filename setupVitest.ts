import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'

import fetchMock from '@fetch-mock/vitest'

import * as matchers from '@testing-library/jest-dom/matchers'

fetchMock.mockGlobal()

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)
// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
