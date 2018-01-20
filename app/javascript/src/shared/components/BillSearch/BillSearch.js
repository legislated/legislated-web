// @flow
import * as React from 'react'
import { createRefetchContainer, graphql } from 'react-relay'
import type { RelayRefetchProp } from 'react-relay'
import styled from 'react-emotion'
import { throttle } from 'lodash'
import { SearchField } from './SearchField'
import { BillList } from './BillList'
import { LoadingIndicator } from '../LoadingIndicator'
import type { Viewer, SearchParams } from '@/types'
import { mixins } from '@/styles'

type Props = {
  viewer: ?Viewer,
  onFilter?: (SearchParams) => void,
  pageSize?: number,
  relay: RelayRefetchProp
}

type State = {
  query: string,
  disablesAnimation: boolean
}

let BillSearch = class BillSearch extends React.Component<*, Props, State> {
  state = {
    query: '',
    disablesAnimation: false
  }

  // actions
  filterBillsForQuery = throttle((query: string) => {
    const { onFilter, relay } = this.props

    const filter = { query }
    onFilter && onFilter(filter)

    this.setState({ disablesAnimation: true })
    relay.refetch({ filter }, null, (error: ?Error) => {
      if (error) {
        console.error(`error updaing query: ${error.toString()}`)
      }

      // completion comes back before render
      global.requestAnimationFrame(() => {
        this.setState({ disablesAnimation: false })
      })
    })
  }, 300)

  // events
  searchFieldDidChange = (query: string) => {
    this.setState({ query })
    this.filterBillsForQuery(query)
  }

  // lifecycle
  render () {
    const {
      viewer,
      pageSize
    } = this.props

    const {
      query,
      disablesAnimation
    } = this.state

    return (
      <Search>
        <SearchField
          value={query}
          onChange={this.searchFieldDidChange}
        />
        <Bills>
          <LoadingIndicator
            isLoading={!viewer}
          />
          {viewer && (
            <BillList
              viewer={viewer}
              pageSize={pageSize}
              isAnimated={!disablesAnimation}
            />
          )}
        </Bills>
      </Search>
    )
  }
}

BillSearch = createRefetchContainer(BillSearch,
  graphql`
    fragment BillSearch_viewer on Viewer {
      bills(
        filter: $filter,
        first: $count,
        after: $cursor
      ) @connection(key: "BillSearch_bills") {
        edges {
          node {
            id
          }
        }
      }
      ...BillList_viewer
    }
  `,
  graphql`
    query BillSearchQuery(
      $filter: BillsSearchFilter!,
      $count: Int!,
      $cursor: String!
    ) {
      viewer {
        ...BillSearch_viewer
      }
    }
  `
)

const Search = styled.div`
  ${mixins.flexColumn};
`

const Bills = styled.div`
  ${mixins.pageWidth};

  position: relative;
  align-self: center;
  margin-top: 40px;
`

export { BillSearch }
