// @flow
import React from 'react'
import { graphql } from 'react-relay'
import { HomeScene } from './HomeScene'
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
      cursor: '',
      count: 3,
      filter: {
        query: ''
      }
    }
  },
  render (props) {
    if (props) {
      return <HomeScene {...props} />
    } else {
      return <HomeScene viewer={null} />
    }
  }
}
