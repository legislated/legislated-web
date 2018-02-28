// @flow
import * as React from 'react'
import { graphql } from 'react-relay'
import { withRouter } from 'react-router-dom'
import { BillHead, Content } from './components'
import { RelayRenderer } from '@/components'
import { stylesheet, colors, mixins } from '@/styles'
import type { Viewer } from '@/types'

type Props = {
  viewer: ?Viewer
}

let Bill = function Bill ({ viewer }: Props) {
  return (
    <div {...rules.container}>
      <div {...rules.content}>
        {viewer && <BillHead bill={viewer.bill} />}
        {viewer ? <Content bill={viewer.bill} /> : <div>Loading...</div>}
      </div>
    </div>
  )
}

Bill = withRouter(Bill)

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    ...mixins.shadows.low,
    ...mixins.borders.low(),
    padding: 15,
    backgroundColor: colors.neutral
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    '> .fa': {
      marginRight: 5,
      fontSize: 13
    }
  }
})

export { Bill }

export function BillRenderer () {
  const query = graphql`
    query BillQuery($id: ID!) {
      viewer {
        bill(id: $id) {
          ...BillHead_bill
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
