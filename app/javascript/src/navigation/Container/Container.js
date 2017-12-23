// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import styled, { css } from 'react-emotion'
import type { ContextRouter } from 'react-router-dom'
import { Header } from './Header'
import { MobileHeader } from './MobileHeader'
import { NotificationView } from 'shared/components'
import { mixins } from 'shared/styles'
import { local } from 'shared/storage'

type Props = {
  children?: any
} & ContextRouter

let Container = class Container extends React.Component<*, Props, *> {
  clearVisitedIntro () {
    // mark the intro as cleared if we've seen it and left the search scene
    const { pathname } = this.props.location
    if (local.get('intro-visited') && pathname !== '/') {
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
      <Wrapper>
        <Header />
        <MobileHeader />
        <Content>
          {children}
          <NotificationView />
        </Content>
      </Wrapper>
    )
  }
}

const Wrapper = styled.section`
  ${css(mixins.fonts.regular)};
  position: relative;
  min-height: 100vh;
`

const Content = styled.div`
  padding: 30px;

  @media (max-width: 700px) {
    padding: 15px;
    padding-bottom: 30px;
  }
`

Container = withRouter(Container)

export { Container }
