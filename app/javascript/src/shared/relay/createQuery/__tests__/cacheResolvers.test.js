/* eslint-env jest */
import { cacheResolvers, getCacheResolver } from '../cacheResolvers'

describe('#getCacheResolver', () => {
  const resolvers = [
    { key: 1, canCacheRequest: () => false },
    { key: 1, canCacheRequest: () => true },
    { key: 2, canCacheRequest: () => true }
  ]

  beforeEach(() => {
    resolvers.forEach(cacheResolvers.add)
  })

  afterEach(() => {
    resolvers.forEach(cacheResolvers.remove)
  })

  it('finds the first matching cache resolver', () => {
    expect(getCacheResolver({}, {})).toBe(resolvers[1])
  })

  it(`doesn't find removed cache resolvers`, () => {
    cacheResolvers.remove(resolvers[1])
    expect(getCacheResolver({}, {})).toBe(resolvers[2])
  })
})
