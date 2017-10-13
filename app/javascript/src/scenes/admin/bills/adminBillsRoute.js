// @flow
import React from 'react'
import { graphql } from 'react-relay'
import { AdminBillsScene } from './AdminBillsScene'
import type { RelayRouteConfig } from 'shared/types'

export const adminBillsRoute: RelayRouteConfig = {
  query: graphql`
    query adminBillsRouteQuery {
      viewer {
        ...AdminBillsScene_viewer
      }
    }
  `,
  render (props) {
    if (props) {
      return <AdminBillsScene {...props} />
    } else {
      return <AdminBillsScene viewer={null} />
    }
  }
}
