import createFetchMock from 'vitest-fetch-mock'
import { afterEach, expect, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

const fetchMock = createFetchMock(vi)

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMock.enableMocks()

// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMock.dontMock()

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)
// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
