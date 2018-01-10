// @flow
import * as React from 'react'
import { createRefetchContainer, graphql } from 'react-relay'
import type { RelayRefetchProp } from 'react-relay'
import styled from 'react-emotion'
import { addDays, endOfDay, startOfDay } from 'date-fns'
import { throttle } from 'lodash'
import { SearchField } from './SearchField'
import { BillList } from './BillList'
import { LoadingIndicator } from '../LoadingIndicator'
import type { Viewer } from '@/types'
import { mixins } from '@/styles'

type Props = {
  viewer: ?Viewer,
  relay: RelayRefetchProp
}

type State = {
  query: string,
  disablesAnimation: boolean
}

export const initialVariables = {
  query: '',
  count: 20,
  startDate: startOfDay(new Date()),
  endDate: endOfDay(addDays(new Date(), 6))
}

let BillSearch = class BillSearch extends React.Component<*, Props, State> {
  state = {
    query: initialVariables.query,
    disablesAnimation: false
  }

  // actions
  filterBillsForQuery = throttle((query: string) => {
    const { relay } = this.props

    this.setState({ disablesAnimation: true })
    relay.refetch({ query }, null, (error: ?Error) => {
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
    const { viewer } = this.props
    const { query, disablesAnimation } = this.state

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
        first: $count, after: $cursor,
        query: $query, from: $startDate, to: $endDate
      ) {
        edges { node { id } }
      }
      ...BillList_viewer
    }
  `,
  graphql`
    query BillSearchQuery(
      $count: Int!, $cursor: String!,
      $query: String!, $startDate: Time!, $endDate: Time!
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
  margin-top: 50px;
`

export { BillSearch }
