// @flow
import * as React from 'react'
import { graphql } from 'react-relay'
import styled from 'react-emotion'
import { HomeIntro } from './HomeIntro'
import { RelayRenderer, BillSearch, Button } from '@/components'
import type { Viewer, SearchParams } from '@/types'
import { mixins } from '@/styles'

type Props = {
  viewer: ?Viewer
}

export class Home extends React.Component<*, Props, *> {
  params: SearchParams

  // events
  didChangeParams = (params: SearchParams) => {
    this.params = params
  }

  // lifecycle
  render () {
    const { viewer } = this.props

    return (
      <Scene>
        <HomeIntro />
        <BillSearch
          viewer={viewer}
          onFilter={this.didChangeParams}
        />
        <BillsButton
          to={{
            pathname: '/bills',
            state: {
              params: this.params
            }
          }}
          isSecondary
          children='View All Bills'
        />
      </Scene>
    )
  }
}

const Scene = styled.section`
  ${mixins.flexColumn};

  position: relative;
  align-self: center;
`

const BillsButton = styled(Button)`
  align-self: center;
  margin-bottom: 90px;
`

export function HomeRenderer () {
  const query = graphql`
    query HomeRendererQuery(
      $filter: BillsSearchFilter!,
      $count: Int!,
      $cursor: String!
    ) {
      viewer {
        ...BillSearch_viewer
      }
    }
  `

  return (
    <RelayRenderer
      query={query}
      root={Home}
      getVariables={() => ({
        count: 3,
        cursor: '',
        filter: {
          query: ''
        }
      })}
    />
  )
}
