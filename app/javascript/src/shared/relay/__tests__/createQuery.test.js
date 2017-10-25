/* eslint-env jest */
import { createQuery } from '../createQuery'
import { QueryResponseCache } from 'relay-runtime'
import { getCacheResolver } from '../cacheResolvers'

const { anything, objectContaining } = expect

// mocks
jest.mock('relay-runtime')
jest.mock('../cacheResolvers')
jest.mock('shared/config', () => ({
  graphUrl: 'http://test.com/graphql'
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
    fetch.mockReturnValueOnce(Promise.resolve({
      json: () => Promise.resolve({ data })
    }))
  })

  afterEach(() => {
    data = null
  })

  it('fetches the request from the graph endpoint', () => {
    execute()
    expect(fetch).toHaveBeenCalledWith('http://test.com/graphql', anything())
  })

  it('fetches the reqeust with the correct headers', () => {
    headers = { foo: 'bar' }
    execute()
    expect(fetch).toHaveBeenCalledWith(anything(), objectContaining({
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

    it('caches the result using the resolver if available', async () => {
      const setCachedResponse = jest.fn()
      getCacheResolver.mockReturnValueOnce({
        setCachedResponse,
        getCachedResponse: () => null
      })

      await execute(operation, variables)
      expect(cache.set).not.toHaveBeenCalled()
      expect(setCachedResponse).toHaveBeenCalledWith(operation, variables, { data }, cache)
    })
  })
})

describe('on a cache hit', () => {
  it('returns the cached data', async () => {
    const payload = { data: 'foo' }
    cache.get.mockReturnValueOnce(payload)

    const result = await execute()
    expect(fetch).not.toHaveBeenCalled()
    expect(result).toEqual(payload)
  })

  it('returns the cache resolver data if available', async () => {
    const payload = { data: 'bar' }
    getCacheResolver.mockReturnValueOnce({
      getCachedResponse: () => payload
    })

    const result = await execute()
    expect(cache.get).not.toHaveBeenCalled()
    expect(result).toEqual(payload)
  })
})
