/* eslint-env jest */
import { loadConfig } from '../config'

// subject
let subject

// specs
describe('in development', () => {
  beforeEach(() => {
    process.env.ENVIRONMENT = 'development'
    subject = loadConfig()
  })

  it('points to localhost', () => {
    expect(subject.graphUrl).toEqual('http://localhost:5000/graphql')
  })
})

describe('in staging', () => {
  beforeEach(() => {
    process.env.ENVIRONMENT = 'staging'
    subject = loadConfig()
  })

  it('points to the staging site', () => {
    expect(subject.graphUrl).toEqual('https://legislated-staging.herokuapp.com/graphql')
  })
})

describe('in production', () => {
  beforeEach(() => {
    process.env.ENVIRONMENT = 'production'
    subject = loadConfig()
  })

  it('points to the production site', () => {
    expect(subject.graphUrl).toEqual('https://legislated.herokuapp.com/graphql')
  })
})

describe('when there is no environment specified', () => {
  it('raises an error', () => {
    delete process.env.ENVIRONMENT
    expect(loadConfig).toThrow('No environment specified!')
  })
})

describe('when there is no associated config', () => {
  it('raises an error', () => {
    process.env.ENVIRONMENT = 'foo'
    expect(loadConfig).toThrow('No config for environment: foo!')
  })
})
