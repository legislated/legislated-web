// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { graphql } from 'react-relay'
import { RelayRenderer, BillSearch } from '@/components'
import type { Viewer } from '@/types'

const PAGE_SIZE = 20

type Props = {
  viewer: ?Viewer
} & ContextRouter

function paramsFromRoute ({ location }: ContextRouter) {
  return location.state && location.state.params
}

let Bills = function Bills ({ viewer, ...props }: Props) {
  return (
    <BillSearch
      viewer={viewer}
      /* $FlowFixMe: intersection & rest types */
      params={paramsFromRoute(props)}
      pageSize={PAGE_SIZE}
    />
  )
}

Bills = withRouter(Bills)

export { Bills }

export function BillsRenderer () {
  const query = graphql`
    query BillsQuery(
      $params: BillsSearchParams!,
      $count: Int!,
      $cursor: String!
    ) {
      viewer {
        ...BillSearch_viewer
      }
    }
  `

  return (
    <RelayRenderer
      // $FlowFixMe: make root accept class / function components after upgrading flow
      root={Bills}
      query={query}
      getVariables={(props) => ({
        count: PAGE_SIZE,
        cursor: '',
        params: {
          key: 'bills',
          query: '',
          ...paramsFromRoute(props)
        }
      })}
    />
  )
}
