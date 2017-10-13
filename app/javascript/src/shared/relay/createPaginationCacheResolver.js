// @flow
import { get, last } from 'lodash'
import type { Connection, RelayCacheResovler } from 'shared/types'

type AnyConnection = Connection<mixed>
type PaginationCacheResolver = (config: {
  count: number,
  queryId: string,
  queryPathToConnection: Array<string>
}) => RelayCacheResovler

export const createPaginationCacheResolver: PaginationCacheResolver = (config) => ({
  canCacheRequest (operation, variables) {
    const { query: startNode } = operation
    const node = config.queryPathToConnection.reduce((node, name) => (
      node && node.selections && node.selections.find((s) => s.name === name)
    ), startNode)

    return !!node
  },
  setCachedResponse (operation, variables, data, cache) {
    const { queryId } = config
    cache.set(queryId, variables, data)
  },
  getCachedResponse (operation, variables: { count: number }, cache) {
    const { count, queryId, queryPathToConnection } = config

    let { count: remaining } = variables
    let response = null
    let pageVariables = {
      ...variables,
      count
    }

    for (; remaining > 0; remaining -= count) {
      // retrieve this page from the cache
      const page = cache.get(queryId, pageVariables)

      // if we ever miss, just return null; we need to fetch
      if (!page) {
        return null
      }

      // merge the edges / info from this page
      const pageConnection: AnyConnection = get(page.data, queryPathToConnection)

      if (!response) {
        response = page
      } else {
        const connection: AnyConnection = get(response.data, queryPathToConnection)
        connection.edges.concat(pageConnection.edges)
        connection.pageInfo = pageConnection.pageInfo
      }

      // update variables for next page
      const lastEdge = last(pageConnection.edges)

      pageVariables = {
        ...pageVariables,
        cursor: lastEdge ? lastEdge.cursor : ''
      }
    }

    return response
  }
})
