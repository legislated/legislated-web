/* eslint-env jest */
import { loadConfig } from '../config'

// subject
let subject

// specs
it('loads a different config per environment', () => {
  process.env.ENVIRONMENT = 'development'
  subject = loadConfig()

  process.env.ENVIRONMENT = 'staging'
  expect(subject).not.toEqual(loadConfig())
})

it('raises an error when there is no environment', () => {
  delete process.env.ENVIRONMENT
  expect(loadConfig).toThrow('Invalid environment specified: null')
})

it('raises an error when there is no matching config', () => {
  process.env.ENVIRONMENT = 'foo'
  expect(loadConfig).toThrow('Invalid environment specified: foo')
})
