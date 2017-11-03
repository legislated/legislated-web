// @flow
import React from 'react'
import { graphql } from 'react-relay'
import addDays from 'date-fns/add_days'
import endOfDay from 'date-fns/end_of_day'
import startOfDay from 'date-fns/start_of_day'
import { SearchScene } from './SearchScene'
import { createPaginationCacheResolver } from 'shared/relay'
import { session } from 'shared/storage'
import type { RelayRouteConfig } from 'shared/types'

export const constants = {
  query: '',
  count: 20,
  startDate: startOfDay(new Date()),
  endDate: endOfDay(addDays(new Date(), 6))
}

export const searchRoute: RelayRouteConfig = {
  query: graphql`
    query searchRouteQuery(
      $count: Int!, $cursor: String!
      $query: String!, $startDate: Time!, $endDate: Time!
    ) {
      viewer {
        ...SearchScene_viewer
      }
    }
  `,
  getInitialVariables(props) {
    // use the last search count on pop so that we can restore to the correct
    // scroll position
    let count = null
    if (props.history.action === 'POP') {
      count = parseInt(session.get('last-search-count'))
    }

    session.set('last-search-count', null)

    return {
      ...constants,
      count: count || constants.count,
      cursor: ''
    }
  },
  cacheResolver: createPaginationCacheResolver({
    count: constants.count,
    queryId: 'BillsConnection',
    queryPathToConnection: ['viewer', 'bills']
  }),
  render(props) {
    if (props) {
      return <SearchScene {...props} />
    } else {
      return <SearchScene viewer={null} />
    }
  }
}
