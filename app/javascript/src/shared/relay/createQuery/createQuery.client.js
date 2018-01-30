// @flow
import { QueryResponseCache } from 'relay-runtime'
import type { QueryResult, QueryPayload, FetchFunction } from 'relay-runtime'
import { getCacheResolver } from './cacheResolvers'
import { config } from '@/config'

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

  // ssr request replay
  const serverPayloads: QueryPayload[] = global._payloads || []
  global._payloads = null

  function getServerPayload () {
    return serverPayloads.shift()
  }

  // caching
  function getQueryId (operation) {
    return operation.name
  }

  function getCachedPayload (operation, variables, resolver) {
    if (resolver) {
      return resolver.getCachedResponse(operation, variables, cache)
    } else {
      return cache.get(getQueryId(operation), variables)
    }
  }

  function setCachedPayload (payload, operation, variables, resolver) {
    if (resolver) {
      resolver.setCachedResponse(operation, variables, payload, cache)
    } else {
      cache.set(getQueryId(operation), variables, payload)
    }
  }

  // async portion of query
  async function remoteQuery (operation, variables, resolver) {
    // fetch data from network
    const response = await global.fetch(config.graphUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    })

    const result: ?QueryResult = await response.json()

    // cache response payload if success
    const payload = asPayload(result)
    if (payload) {
      setCachedPayload(payload, operation, variables, resolver)
    }

    return result
  }

  return function query (operation, variables) {
    // resolve synchronously with the ssr payload if available
    let payload = getServerPayload()
    if (payload != null) {
      return asResult(payload)
    }

    // check for an applicable cache resolver
    const resolver = getCacheResolver(operation, variables)

    // resolve synchronously with the cached payload if available
    payload = getCachedPayload(operation, variables, resolver)
    if (payload != null) {
      return asResult(payload)
    }

    // fetch the remote payload on a miss
    return remoteQuery(operation, variables, resolver)
  }
}
