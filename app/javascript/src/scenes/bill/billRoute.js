// @flow
import React from 'react'
import { graphql } from 'react-relay'
import { BillScene } from './BillScene'
import type { RelayRouteConfig } from 'shared/types'

export const billRoute: RelayRouteConfig = {
  query: graphql`
    query billRouteQuery($id: ID!) {
      viewer {
        ...BillScene_viewer
      }
    }
  `,
  render (props) {
    if (props) {
      return <BillScene {...props} />
    } else {
      return <BillScene viewer={null} />
    }
  }
}
