// @flow
import * as React from 'react'
import { createRefetchContainer, graphql } from 'react-relay'
import type { RelayRefetchProp } from 'react-relay'
import styled from 'react-emotion'
import { throttle } from 'lodash'
import { SearchField } from './SearchField'
import { BillList } from './BillList'
import { LoadingIndicator } from './LoadingIndicator'
import type { Viewer } from 'shared/types'
import { mixins } from 'shared/styles'
import { addDays, endOfDay, startOfDay } from 'shared/date'

type Props = {
  viewer: ?Viewer,
  relay: RelayRefetchProp
}

type State = {
  query: string,
  disableAnimations: boolean
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
    disableAnimations: false
  }

  // actions
  filterBillsForQuery = throttle((query: string) => {
    const { relay } = this.props

    this.setState({ disableAnimations: true })
    relay.refetch({ query }, null, (error: ?Error) => {
      if (error) {
        console.error(`error updaing query: ${error.toString()}`)
      }

      // completion comes back before render
      global.requestAnimationFrame(() => {
        this.setState({ disableAnimations: false })
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
    const { query, disableAnimations } = this.state

    return (
      <Section>
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
              animated={!disableAnimations}
            />
          )}
        </Bills>
      </Section>
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

const Section = styled.div`
  ${mixins.flexColumn};
`

const Bills = styled.div`
  position: relative;
`

export { BillSearch }
