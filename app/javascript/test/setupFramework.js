/* eslint-env jest */
import 'jest-enzyme/lib'
import * as matchers from './matchers'
import { resetMocks } from './mocks'

expect.extend(matchers)

beforeEach(() => {
  resetMocks()
})
