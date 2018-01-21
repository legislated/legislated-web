// @flow
import * as React from 'react'
import { graphql } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import styled from 'react-emotion'
import { HomeIntro } from './HomeIntro'
import { RelayRenderer, BillSearch, Button } from '@/components'
import type { Viewer, SearchParams } from '@/types'
import { mixins } from '@/styles'

const DEFAULT_PARAMS = {
  query: ''
}

type Props = {
  viewer: ?Viewer
} & ContextRouter

let Home = class Home extends React.Component<*, Props, *> {
  params: SearchParams = DEFAULT_PARAMS

  // events
  didChangeParams = (params: SearchParams) => {
    this.params = params
  }

  didClickViewAll = () => {
    // it would be better to pass params / refresh the view
    // by updating the search query in the url
    const { history } = this.props
    history.push({
      pathname: '/bills',
      state: {
        params: this.params
      }
    })
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
          onClick={this.didClickViewAll}
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
  margin-bottom: 70px;
`

Home = withRouter(Home)

export { Home }

export function HomeRenderer () {
  const query = graphql`
    query HomeQuery(
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
      root={Home}
      query={query}
      getVariables={() => ({
        count: 3,
        cursor: '',
        filter: {
          key: 'home',
          ...DEFAULT_PARAMS
        }
      })}
    />
  )
}
