// @flow
import type { FetchFunction } from 'relay-runtime'
import { createBaseQuery } from './createBaseQuery'

export function createQuery (headers: Object): FetchFunction {
  const baseQuery = createBaseQuery(headers)

  return function query (operation, variables) {
    return baseQuery(operation, variables)
  }
}
