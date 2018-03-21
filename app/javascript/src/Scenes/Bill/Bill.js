// @flow
import * as React from 'react'
import { graphql } from 'react-relay'
import styled from 'react-emotion'
import { BillDetail } from './BillDetail'
import { mixins } from '@/styles'
import { Loading } from '@/components'
import { createRenderer } from '@/functions'
import type { Viewer } from '@/types'

type Props = {
  viewer: ?Viewer
}

let Bill = function Bill ({ viewer }: Props) {
  return (
    <Scene>
      {viewer && (
        <BillDetail bill={viewer.bill} />
      )}
      <Loading
        isLoading={viewer == null}
      />
    </Scene>
  )
}

Bill = createRenderer(Bill, graphql`
  query BillQuery($id: ID!) {
    viewer {
      bill(id: $id) {
        ...BillDetail_bill
      }
    }
  }
`)

const Scene = styled.section`
  ${mixins.flexColumn};
  ${mixins.pageContent};

  align-self: center;
  margin-top: 30px;
  margin-bottom: 30px;
`

export { Bill }
