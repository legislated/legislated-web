// @flow
import * as React from 'react'
import { createPaginationContainer, graphql } from 'react-relay'
import type { RelayPaginationProp } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import styled from 'react-emotion'
import { BillCell } from './BillCell'
import { TranslateAndFade, Button } from '@/components'
import { session } from '@/storage'
import { withLoadMoreArgs } from '@/relay'
import { colors, mixins } from '@/styles'
import type { Viewer } from '@/types'

type Props = {
  viewer: Viewer,
  isAnimated: boolean,
  pageSize?: number,
  relay: RelayPaginationProp
} & ContextRouter

type State = {
  disablesAnimation: boolean
}

function formatCount ({ bills }: Viewer) {
  return `Found ${bills.count} result${bills.count === 1 ? '' : 's'}.`
}

let BillList = class BillList extends React.Component<*, Props, State> {
  state = {
    disablesAnimation: this.isFromPop
  }

  // accessors
  get isFromPop () {
    return this.props.history.action === 'POP'
  }

  // events
  didClickLoadMore = () => {
    const { relay, pageSize } = this.props
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    pageSize && relay.loadMore(pageSize, (error: ?Error) => {
      if (error) {
        console.error(`error loading next page: ${error.toString()}`)
      }
    })
  }

  // lifecycle
  componentDidMount () {
    if (this.isFromPop) {
      this.setState({ disablesAnimation: false })
    }
  }

  componentWillUnmount () {
    const { viewer } = this.props
    viewer && session.set('last-search-count', `${viewer.bills.edges.length}`)
  }

  render () {
    const { viewer, isAnimated, pageSize, relay } = this.props
    const { disablesAnimation } = this.state

    return (
      <Bills>
        <h5>{formatCount(viewer)}</h5>
        <TranslateAndFade
          component={List}
          disable={!isAnimated || disablesAnimation}
        >
          {viewer.bills.edges.map(({ node }) => (
            <div key={node.id}>
              <BillCell bill={node} />
            </div>
          ))}
        </TranslateAndFade>
        {pageSize && relay.hasMore() && (
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
        filter: $filter,
        first: $count,
        after: $cursor
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
        $filter: BillsSearchFilter!,
        $count: Int!,
        $cursor: String!
      ) {
        viewer {
          ...BillList_viewer
        }
      }
    `
  })
)

const spacing = 50

const Bills = styled.div`
  ${mixins.flexColumn};

  > h5 {
    margin-bottom: ${spacing}px;
  }
`

const List = styled.div`
  > * {
    margin-bottom: ${spacing}px;
    padding-bottom: ${spacing}px;
    border-bottom: 1px solid ${colors.gray4};
  }
`

const ActionButton = styled(Button)`
  align-self: center;
  margin-bottom: 90px;
`

export { BillList }
