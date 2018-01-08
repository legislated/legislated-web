// @flow
import * as React from 'react'
import { createPaginationContainer, graphql } from 'react-relay'
import type { RelayPaginationProp } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { formatDate } from 'date-fns'
import { initialVariables } from './BillSearch'
import { BillCell } from './BillCell'
import { LoadMoreButton } from './LoadMoreButton'
import { TranslateAndFade } from 'shared/components'
import { session } from 'shared/storage'
import { withLoadMoreArgs } from 'shared/relay'
import { stylesheet, mixins } from 'shared/styles'
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

function formatCount ({ bills }: Viewer) {
  return `Found ${bills.count} result${bills.count === 1 ? '' : 's'}.`
}

let BillList = class BillList extends React.Component<*, Props, State> {
  state = {
    disableAnimations: this.props.history.action === 'POP'
  }

  // events
  didClickLoadMore = () => {
    const { relay } = this.props
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    relay.loadMore(initialVariables.count, (error: ?Error) => {
      if (error) {
        console.error(`error loading next page: ${error.toString()}`)
      }
    })
  }

  // lifecycle
  componentDidMount () {
    const { history } = this.props
    if (history.action === 'POP') {
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
    const { startDate, endDate } = initialVariables

    return <div {...rules.container}>
      <div {...rules.header}>
        <h2>Upcoming Bills</h2>
        <div>{`${format(startDate)} to ${format(endDate)}`}</div>
        <div>{formatCount(viewer)}</div>
      </div>
      <TranslateAndFade disable={!animated || disableAnimations}>
        {viewer.bills.edges.map(({ node }) => (
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

BillList = createPaginationContainer(withRouter(BillList),
  graphql`
    fragment BillList_viewer on Viewer {
      bills(
        first: $count, after: $cursor,
        query: $query, from: $startDate, to: $endDate
      ) @connection(key: "BillList_bills") {
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
      query BillListQuery(
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
      ...mixins.mobile.glam({
        marginBottom: 0
      })
    },
    '> div': {
      fontSize: 18,
      ':first-of-type': {
        display: 'inline-block',
        marginLeft: 5
      },
      ...mixins.mobile.glam({
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
    ...mixins.mobile.glam({
      marginTop: 20
    })
  }
})

export { BillList }
