// @flow
import { QueryResponseCache } from 'relay-runtime'
import type { QueryResult, QueryPayload, FetchFunction } from 'relay-runtime'
import { getCacheResolver } from './cacheResolvers'
import config from 'shared/config'

// ssr request replay
function getPayloads () {
  const payloadData = global._payloads
  global._payloads = null
  return payloadData
}

// helpers
function asPayload (result: ?QueryResult): ?QueryPayload {
  return result && result.data ? { data: result.data } : null
}

function asResult (payload: QueryPayload): QueryResult {
  return { data: payload.data }
}

// query factory
// see: https://facebook.github.io/relay/docs/network-layer.html
// see: https://github.com/facebook/relay/issues/1688#issuecomment-302931855
export function createQuery (extraHeaders: Object): FetchFunction {
  const cache = new QueryResponseCache({ size: 250, ttl: 60 * 5 * 1000 })
  const headers = {
    'content-type': 'application/json',
    ...extraHeaders
  }

  const payloads = getPayloads()

  return async function query (operation, variables) {
    // first, check for an ssr payload to replay
    let payload: ?QueryPayload = payloads.shift()
    if (payload != null) {
      return asResult(payload)
    }

    // find an applicable stop-gap cache resolver (if any)
    const resolver = getCacheResolver(operation, variables)

    // check the cache for a response, using the operation name as the query id
    const { name: queryId } = operation
    if (resolver) {
      payload = resolver.getCachedResponse(operation, variables, cache)
    } else {
      payload = cache.get(queryId, variables)
    }

    if (payload != null) {
      return asResult(payload)
    }

    // fetch data from network if missed
    const response = await fetch(config.graphUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    })

    const result = await response.json()

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
