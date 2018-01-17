// @flow
import React from 'react'
import { graphql } from 'react-relay'
import { Home } from './Home'
import type { RelayRouteConfig } from '@/types'

export const homeRoute: RelayRouteConfig = {
  query: graphql`
    query homeRouteQuery(
      $filter: BillsSearchFilter!,
      $count: Int!,
      $cursor: String!
    ) {
      viewer {
        ...HomeScene_viewer
      }
    }
  `,
  getInitialVariables (props) {
    return {
      count: 3,
      cursor: '',
      filter: {
        query: ''
      }
    }
  },
  render (props) {
    if (props) {
      return <Home {...props} />
    } else {
      return <Home viewer={null} />
    }
  }
}
