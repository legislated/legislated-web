// @flow
import * as React from 'react'
import { graphql } from 'react-relay'
import { withRouter } from 'react-router-dom'
import { Content } from './components'
import { RelayRenderer } from '@/components'
import type { Viewer } from '@/types'

type Props = {
  viewer: ?Viewer
}

let Bill = function Bill ({ viewer }: Props) {
  return (
    <div>
      <div>
        {viewer ? <Content bill={viewer.bill} /> : <div>Loading...</div>}
      </div>
    </div>
  )
}

Bill = withRouter(Bill)

export { Bill }

export function BillRenderer () {
  const query = graphql`
    query BillQuery($id: ID!) {
      viewer {
        bill(id: $id) {
          ...Content_bill
        }
      }
    }
  `

  return (
    <RelayRenderer
      query={query}
      root={Bill}
    />
  )
}
