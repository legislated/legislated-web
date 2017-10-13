// @flow
import React, { Component } from 'react'
import { createPaginationContainer, graphql } from 'react-relay'
import type { RelayPaginationProp } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import type moment from 'moment'
import { BillCell } from './BillCell'
import { BillAnimation, billRule } from './BillAnimation'
import { LoadMoreButton } from './LoadMoreButton'
import { constants } from '../searchRoute'
import { withLoadMoreArgs, unwrap } from 'shared/relay'
import { session } from 'shared/storage'
import { stylesheet, mixins } from 'shared/styles'
import type { Viewer } from 'shared/types'

function format (date: moment): string {
  return date.format('MMM Do')
}

let BillsList = class BillsList extends Component {
  props: {
    viewer: Viewer,
    animated: Boolean,
    relay: RelayPaginationProp
  } & ContextRouter

  state = {
    disableAnimations: false
  }

  // events
  didClickLoadMore = () => {
    const { relay } = this.props
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    relay.loadMore(constants.count, (error: ?Error) => {
      if (error) {
        console.error(`error loading next page: ${error.toString()}`)
      }
    })
  }

  // lifecycle
  componentWillMount () {
    if (this.props.history.action === 'POP') {
      this.setState({ disableAnimations: true })
    }
  }

  componentDidMount () {
    if (this.props.history.action === 'POP') {
      this.setState({ disableAnimations: false })
    }
  }

  componentWillUnmount () {
    const { viewer } = this.props
    if (viewer) {
      session.set('last-search-count', `${viewer.bills.edges.length}`)
    }
  }

  render () {
    const { disableAnimations } = this.state
    const { relay, viewer, animated } = this.props
    const { bills } = viewer
    const { count } = bills
    const { startDate, endDate } = constants

    return <div {...rules.container}>
      <div {...rules.header}>
        <h2>Upcoming Bills</h2>
        <div>{`${format(startDate)} to ${format(endDate)}`}</div>
        <div>{`Found ${count} result${count === 1 ? '' : 's'}.`}</div>
      </div>
      <BillAnimation disable={!animated || disableAnimations}>
        {this.renderBills(unwrap(bills))}
      </BillAnimation>
      <LoadMoreButton
        styles={rules.loadMoreButton}
        hasMore={relay.hasMore()}
        onClick={this.didClickLoadMore}
      />
    </div>
  }

  renderBills (bills): Array<React$Element<*>> {
    return bills.map((bill, i) => {
      return <BillCell key={bill.id} styles={billRule} bill={bill} />
    })
  }
}

BillsList = createPaginationContainer(withRouter(BillsList),
  graphql`
    fragment BillsList_viewer on Viewer {
      bills(
        first: $count, after: $cursor,
        query: $query, from: $startDate, to: $endDate
      ) @connection(key: "BillsList_bills") {
        count
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            ...BillCell_bill
          }
        }
      }
    }
  `,
  withLoadMoreArgs({
    getConnectionFromProps (props) {
      return props.viewer && props.viewer.bills
    },
    query: graphql`
      query BillsListQuery(
        $count: Int!, $cursor: String!,
        $query: String!, $startDate: Time!, $endDate: Time!
      ) {
        viewer {
          ...BillsList_viewer
        }
      }
    `
  })
)

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  header: {
    marginBottom: 15,
    '> h2': {
      display: 'inline-block',
      marginBottom: 5,
      ...mixins.mobile({
        marginBottom: 0
      })
    },
    '> div': {
      fontSize: 18,
      ':first-of-type': {
        display: 'inline-block',
        marginLeft: 5
      },
      ...mixins.mobile({
        fontSize: 16,
        ':first-of-type': {
          display: 'none'
        }
      })
    }
  },
  loadMoreButton: {
    alignSelf: 'center',
    marginTop: 30,
    ...mixins.mobile({
      marginTop: 20
    })
  }
})

export { BillsList }
