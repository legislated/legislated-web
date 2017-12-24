// @flow
import * as React from 'react'
import { createPaginationContainer, graphql } from 'react-relay'
import type { RelayPaginationProp } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { BillCell } from './BillCell'
import { LoadMoreButton } from './LoadMoreButton'
import { constants } from '../searchRoute'
import { TranslateAndFade } from 'shared/components'
import { formatDate } from 'shared/date'
import { session } from 'shared/storage'
import { stylesheet, mixins } from 'shared/styles'
import { withLoadMoreArgs } from 'shared/relay'
import type { Viewer } from 'shared/types'

type Props = {
  relay: RelayPaginationProp,
  viewer: Viewer,
  animated: Boolean
} & ContextRouter

type State = {
  disableAnimations: boolean
}

function format (date: Date): string {
  return formatDate(date, 'MMM Do')
}

let BillsList = class BillsList extends React.Component<*, Props, State> {
  state = {
    disableAnimations: this.props.history.action === 'POP'
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
      <TranslateAndFade
        disable={!animated || disableAnimations}
      >
        {bills.edges.map(({ node }) => (
          <BillCell key={node.id} bill={node} />
        ))}
      </TranslateAndFade>
      <LoadMoreButton
        styles={rules.loadMoreButton}
        hasMore={relay.hasMore()}
        onClick={this.didClickLoadMore}
      />
    </div>
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
