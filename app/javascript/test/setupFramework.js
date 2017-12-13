/* eslint-env jest */
import 'jest-enzyme/lib'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as matchers from './matchers'
import { resetMocks } from './mocks'

// configure enzyme
enzyme.configure({
  adapter: new Adapter()
})

// configure jest
expect.extend(matchers)

beforeEach(() => {
  resetMocks()
})
