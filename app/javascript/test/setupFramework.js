/* eslint-env jest */
import 'jest-enzyme/lib'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { resetMocks } from './mocks'
import * as matchers from './matchers'

// configure enzyme
enzyme.configure({ adapter: new Adapter() })

// configure jest
expect.extend(matchers)
beforeEach(resetMocks)
