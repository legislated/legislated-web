// @flow
import * as React from 'react'
import { graphql } from 'react-relay'
import { withRouter, type ContextRouter } from 'react-router-dom'
import { BillSearch } from '@/components'
import { createRendererWithConfig } from '@/functions'
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
      /* $FlowFixMe: intersection & rest/spread */
      params={paramsFromRoute(props)}
      pageSize={PAGE_SIZE}
    />
  )
}

Bills = createRendererWithConfig(withRouter(Bills), {
  query: graphql`
    query BillsQuery(
      $params: BillsSearchParams!,
      $count: Int!,
      $cursor: String!
    ) {
      viewer {
        ...BillSearch_viewer
      }
    }
  `,
  getVariables: (props) => ({
    count: PAGE_SIZE,
    cursor: '',
    params: {
      key: 'bills',
      query: '',
      ...paramsFromRoute(props)
    }
  })
})

export { Bills }
