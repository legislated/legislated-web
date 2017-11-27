// @flow
import request from 'sync-request'
import type { FetchFunction } from 'relay-runtime'
import config from 'shared/config'

// ssr request storage
const payloads = []

export function getPayloads () {
  return payloads
}

// query factory
export function createQuery (extraHeaders: Object): FetchFunction {
  const headers = {
    'content-type': 'application/json',
    ...extraHeaders
  }

  return function query (operation, variables) {
    // make request
    const response = request('POST', config.graphUrl, {
      headers,
      json: {
        query: operation.text,
        variables
      }
    })

    // push on a null in case getBody errors
    const index = payloads.length
    payloads.push(null)

    // store the payload for a successful request
    const result = JSON.parse(response.getBody('utf8'))
    payloads[index] = result

    return result
  }
}
