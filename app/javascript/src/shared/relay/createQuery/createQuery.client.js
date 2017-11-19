// @flow
import { QueryResponseCache } from 'relay-runtime'
import type { QueryResult, QueryPayload, FetchFunction } from 'relay-runtime'
import { createBaseQuery } from './createBaseQuery'
import { getCacheResolver } from './cacheResolvers'

// see: https://facebook.github.io/relay/docs/network-layer.html
// see: https://github.com/facebook/relay/issues/1688#issuecomment-302931855
export function createQuery (headers: Object): FetchFunction {
  const cache = new QueryResponseCache({ size: 250, ttl: 60 * 5 * 1000 })
  const baseQuery = createBaseQuery(headers)

  return async function query (operation, variables) {
    // find an applicable stop-gap cache resolver (if any)
    const resolver = getCacheResolver(operation, variables)
    // default to operation name for queryId if nothing matches
    const { name: queryId } = operation

    // first, check the cache for a response
    let payload: ?QueryPayload
    if (resolver) {
      payload = resolver.getCachedResponse(operation, variables, cache)
    } else {
      payload = cache.get(queryId, variables)
    }

    if (payload) {
      return asResult(payload)
    }

    // fetch data from network if missed
    const result = await baseQuery(operation, variables)

    // cache response payload if success
    payload = asPayload(result)
    if (payload) {
      if (resolver) {
        resolver.setCachedResponse(operation, variables, payload, cache)
      } else {
        cache.set(queryId, variables, payload)
      }
    }

    return result
  }
}

// helpers
function asPayload (result: ?QueryResult): ?QueryPayload {
  return result && result.data ? { data: result.data } : null
}

function asResult (payload: QueryPayload): QueryResult {
  return { data: payload.data }
}
