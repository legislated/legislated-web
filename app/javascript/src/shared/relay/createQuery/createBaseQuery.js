// @flow
import type { FetchFunction } from 'relay-runtime'
import config from 'shared/config'

export function createBaseQuery (extraHeaders: Object): FetchFunction {
  const headers = {
    'content-type': 'application/json',
    ...extraHeaders
  }

  return async function baseQuery (operation, variables) {
    // fetch data from network if missed
    const response = await fetch(config.graphUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    })

    return response.json()
  }
}
