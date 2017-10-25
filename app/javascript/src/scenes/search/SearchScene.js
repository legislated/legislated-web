// @flow
import React, { Component } from 'react'
import { createRefetchContainer, graphql } from 'react-relay'
import type { RelayRefetchProp } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { throttle } from 'lodash'
import { constants } from './searchRoute'
import { Intro, SearchField, BillsList, LoadingIndicator } from './components'
import { stylesheet, colors, mixins } from 'shared/styles'
import type { Viewer } from 'shared/types'

let SearchScene = class SearchScene extends Component {
  props: {
    viewer: ?Viewer,
    relay: RelayRefetchProp
  } & ContextRouter

  state = {
    query: constants.query,
    disableAnimations: false
  }

  // events
  searchFieldDidChange = (query: string) => {
    this.setState({ query })
    this.filterBillsForQuery(query)
  }

  // helpers
  filterBillsForQuery: (query: string) => void = throttle((query: string) => {
    this.setState({ disableAnimations: true })
    this.props.relay.refetch({ query }, null, (error: ?Error) => {
      if (error) {
        console.error(`error updaing query: ${error.toString()}`)
      }

      // completion comes back before render
      requestAnimationFrame(() => {
        this.setState({ disableAnimations: false })
      })
    })
  }, 300)

  // lifecycle
  render () {
    const { viewer } = this.props
    const { query, disableAnimations } = this.state

    return <div {...rules.container}>
      <div {...rules.header}>
        <div {...rules.background} />
        <Intro styles={rules.section} />
        <SearchField
          styles={rules.section}
          value={query}
          onChange={this.searchFieldDidChange}
        />
      </div>
      <div {...rules.content}>
        <div {...rules.indicator}>
          <LoadingIndicator isLoading={!viewer} />
        </div>
        {viewer && <BillsList
          viewer={viewer}
          animated={!disableAnimations}
        />}
      </div>
    </div>
  }
}

SearchScene = createRefetchContainer(withRouter(SearchScene),
  graphql`
    fragment SearchScene_viewer on Viewer {
      bills(
        first: $count, after: $cursor,
        query: $query, from: $startDate, to: $endDate
      ) {
        edges { node { id } }
      }
      ...BillsList_viewer
    }
  `,
  graphql`
    query SearchSceneQuery(
      $count: Int!, $cursor: String!,
      $query: String!, $startDate: Time!, $endDate: Time!
    ) {
      viewer {
        ...SearchScene_viewer
      }
    }
  `
)

const rules = stylesheet({
  container: {
    ...mixins.column
  },
  header: {
    position: 'relative',
    marginBottom: 30,
    ...mixins.mobile({
      marginBottom: 15
    })
  },
  background: {
    position: 'absolute',
    top: -30,
    bottom: 0,
    left: -30,
    width: '100vw',
    zIndex: -1,
    backgroundColor: colors.backgroundAccent,
    ...mixins.mobile({
      left: -15
    })
  },
  section: {
    marginBottom: 30,
    ...mixins.mobile({
      marginBottom: 15
    })
  },
  content: {
    ...mixins.column,
    position: 'relative'
  },
  loadMoreButton: {
    alignSelf: 'center',
    marginTop: 30,
    ...mixins.mobile({
      marginTop: 20
    })
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...mixins.column
  }
})

export { SearchScene }
