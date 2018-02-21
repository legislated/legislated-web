/* eslint-env jest */
import { QueryResponseCache } from 'relay-runtime'
import { createQuery } from '../createQuery.client'

const { anything, objectContaining } = expect

// mocks
jest.mock('relay-runtime')
jest.mock('@/config', () => ({
  config: {
    graphUrl: 'http://test.com/graphql'
  }
}))

// subject
let subject
let headers = {}

async function execute (operation = {}, variables = {}) {
  if (!subject) {
    subject = createQuery(headers)
  }

  return subject(operation, variables)
}

// spec
const cache = {
  get: jest.fn(),
  set: jest.fn()
}

beforeEach(() => {
  QueryResponseCache.mockImplementation(() => cache)
})

afterEach(() => {
  subject = null
})

describe('on a cache miss', () => {
  let data

  beforeEach(() => {
    global.fetch.mockReturnValueOnce(Promise.resolve({
      json: () => Promise.resolve({ data })
    }))
  })

  afterEach(() => {
    data = null
  })

  it('fetches the request from the graph endpoint', () => {
    execute()
    expect(global.fetch).toHaveBeenCalledWith('http://test.com/graphql', anything())
  })

  it('fetches the reqeust with the correct headers', () => {
    headers = { foo: 'bar' }
    execute()
    expect(global.fetch).toHaveBeenCalledWith(anything(), objectContaining({
      headers: objectContaining(headers)
    }))
  })

  describe('when it has data', () => {
    const operation = { name: 'query-id' }
    const variables = { bar: 'baz' }

    beforeEach(() => {
      data = { foo: 'bar' }
    })

    it('caches the result', async () => {
      await execute(operation, variables)
      expect(cache.set).toHaveBeenCalledWith(operation.name, variables, { data })
    })
  })
})

describe('on a cache hit', () => {
  it('returns the cached data', async () => {
    const payload = { data: 'foo' }
    cache.get.mockReturnValueOnce(payload)

    const result = await execute()
    expect(global.fetch).not.toHaveBeenCalled()
    expect(result).toEqual(payload)
  })
})
