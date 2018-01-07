// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'react-emotion'
import type { ContextRouter } from 'react-router-dom'
import { Header } from './Header'
import { MobileHeader, MOBILE_HEADER_HEIGHT } from './MobileHeader'
import { NotificationView } from 'shared/components'
import { mixins } from 'shared/styles'
import { local } from 'shared/storage'

type Props = {
  children?: any
} & ContextRouter

let Layout = class Layout extends React.Component<*, Props, *> {
  clearVisitedIntro () {
    // mark the intro as cleared if we've seen it and left the search scene
    const { location } = this.props
    if (local.get('intro-visited') && location.pathname !== '/') {
      local.set('intro-cleared', 'true')
    }
  }

  // lifecycle
  componentDidMount () {
    this.clearVisitedIntro()
  }

  componentDidUpdate () {
    this.clearVisitedIntro()
  }

  render () {
    const { children } = this.props

    return (
      <Container>
        <Header />
        <MobileHeader />
        <Content>
          {children}
          <NotificationView />
        </Content>
      </Container>
    )
  }
}

const Container = styled.div`
  ${mixins.flexColumn};

  position: relative;
  min-height: 100vh;
`

const Content = styled.div`
  flex: 1;

  ${mixins.mobile`
    margin-top: ${MOBILE_HEADER_HEIGHT}px;
    padding: 15px;
    padding-bottom: 30px;
  `}
`

Layout = withRouter(Layout)

export { Layout }
