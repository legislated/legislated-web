// @flow
import * as React from 'react'
import { graphql } from 'react-relay'
import styled from 'react-emotion'
import { withRouter, type ContextRouter } from 'react-router-dom'
import { HomeIntro } from './HomeIntro'
import { HomeFooter } from './HomeFooter'
import { BillSearch, Button } from '@/components'
import { createRendererWithConfig } from '@/functions'
import { mixins } from '@/styles'
import type { Viewer, SearchParams } from '@/types'

const DEFAULT_PARAMS: SearchParams = {
  query: '',
  subset: 'SLIPS'
}

type Props = {
  viewer: ?Viewer
} & ContextRouter

let Home = class Home extends React.Component<Props> {
  params = DEFAULT_PARAMS

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
          params={DEFAULT_PARAMS}
          onChange={this.didChangeParams}
        />
        {viewer && (
          <BillsButton
            isSecondary
            onClick={this.didClickViewAll}
            children='View All Bills'
          />
        )}
        <HomeFooter />
      </Scene>
    )
  }
}

const Scene = styled.section`
  ${mixins.flexColumn};
  position: relative;
`

const BillsButton = styled(Button)`
  align-self: center;
  margin-bottom: 70px;
`

Home = createRendererWithConfig(withRouter(Home), {
  query: graphql`
    query HomeQuery(
      $params: BillsSearchParams!,
      $count: Int!,
      $cursor: String!
    ) {
      viewer {
        ...BillSearch_viewer
      }
    }
  `,
  getVariables: () => ({
    count: 3,
    cursor: '',
    params: {
      key: 'home',
      ...DEFAULT_PARAMS
    }
  })
})

export { Home }
