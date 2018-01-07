// @flow
import React from 'react'
import { graphql } from 'react-relay'
import { HomeScene } from './HomeScene'
import { billSearchInitialVariables } from 'shared/components'
import { createPaginationCacheResolver } from 'shared/relay'
import { session } from 'shared/storage'
import type { RelayRouteConfig } from 'shared/types'

export const homeRoute: RelayRouteConfig = {
  query: graphql`
    query homeRouteQuery(
      $count: Int!, $cursor: String!
      $query: String!, $startDate: Time!, $endDate: Time!
    ) {
      viewer {
        ...HomeScene_viewer
      }
    }
  `,
  getInitialVariables (props) {
    // use the last search count on pop so that we can restore to the correct
    // scroll position
    let count = null
    if (props.history.action === 'POP') {
      count = parseInt(session.get('last-search-count'))
    }

    session.set('last-search-count', null)

    return {
      ...billSearchInitialVariables,
      count: count || billSearchInitialVariables.count,
      cursor: ''
    }
  },
  cacheResolver: createPaginationCacheResolver({
    count: billSearchInitialVariables.count,
    queryId: 'BillsConnection',
    queryPathToConnection: ['viewer', 'bills']
  }),
  render (props) {
    if (props) {
      return <HomeScene {...props} />
    } else {
      return <HomeScene viewer={null} />
    }
  }
}
