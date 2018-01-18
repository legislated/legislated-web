// @flow
import * as React from 'react'
import { graphql } from 'react-relay'
import { RelayRenderer, BillSearch } from '@/components'
import type { Viewer } from '@/types'

type Props = {
  viewer: Viewer
}

const PAGE_SIZE = 20

export function Bills ({ viewer }: Props) {
  return (
    <BillSearch
      viewer={viewer}
      pageSize={PAGE_SIZE}
    />
  )
}

export function BillsRenderer () {
  const query = graphql`
    query BillsQuery(
      $filter: BillsSearchFilter!,
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
      getVariables={() => ({
        count: PAGE_SIZE,
        cursor: '',
        filter: {
          query: ''
        }
      })}
    />
  )
}
