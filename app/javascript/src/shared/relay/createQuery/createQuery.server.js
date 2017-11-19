// @flow
import request from 'sync-request'
import type { FetchFunction } from 'relay-runtime'
import config from 'shared/config'

export function createQuery (extraHeaders: Object): FetchFunction {
  const headers = {
    'content-type': 'application/json',
    ...extraHeaders
  }

  return function query (operation, variables) {
    const response = request('POST', config.graphUrl, {
      headers,
      json: {
        query: operation.text,
        variables
      }
    })

    const result = JSON.parse(response.getBody('utf8'))

    return result
  }
}
