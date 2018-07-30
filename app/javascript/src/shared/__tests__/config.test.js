/* eslint-env jest */
import { Config } from '../config'

// specs
it('raises an error when there is no graph url', () => {
  process.env.GRAPH_URL = ''
  expect(() => new Config()).toThrow('GRAPH_URL environment variable was blank')
})
