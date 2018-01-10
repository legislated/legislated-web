// @flow
import * as React from 'react'
import { createPaginationContainer, graphql } from 'react-relay'
import type { RelayPaginationProp } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import styled from 'react-emotion'
import { initialVariables } from './BillSearch'
import { BillCell } from './BillCell'
import { TranslateAndFade, Button } from '@/components'
import { session } from '@/storage'
import { withLoadMoreArgs } from '@/relay'
import { colors, mixins } from '@/styles'
import type { Viewer } from '@/types'

type Props = {
  relay: RelayPaginationProp,
  viewer: Viewer,
  isAnimated: Boolean
} & ContextRouter

type State = {
  disableAnimations: boolean
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
    const { relay, viewer, isAnimated } = this.props
    const { disableAnimations } = this.state

    return (
      <Bills>
        <h5>{formatCount(viewer)}</h5>
        <TranslateAndFade
          component={List}
          disable={!isAnimated || disableAnimations}
        >
          {viewer.bills.edges.map(({ node }) => (
            <BillCell key={node.id} bill={node} />
          ))}
        </TranslateAndFade>
        {relay.hasMore() && (
          <ActionButton
            isSecondary
            onClick={this.didClickLoadMore}
            children='Load More'
          />
        )}
      </Bills>
    )
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

const Bills = styled.div`
  ${mixins.flexColumn};

  > h5 {
    margin-bottom: 50px;
  }
`

const List = styled.div`
  > * + * {
    margin-top: 50px;
    padding-top: 50px;
    border-top: 1px solid ${colors.gray4};
  }
`

const ActionButton = styled(Button)`
  align-self: center;
`

export { BillList }
