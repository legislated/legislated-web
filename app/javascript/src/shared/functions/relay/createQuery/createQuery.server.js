// @flow
import request from 'sync-request'
import type { FetchFunction } from 'relay-runtime'
import { config } from '@/config'

// ssr request storage
let payloads = []

export function getPayloads () {
  const reference = payloads
  payloads = []
  return reference
}

// query factory
export function createQuery (extraHeaders: Object): FetchFunction {
  const headers = {
    'content-type': 'application/json',
    ...extraHeaders
  }

  return function query (operation, variables) {
    // make request
    const response = request('POST', config.graphEndpoint, {
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
