// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { MobileMenu } from './MobileMenu'
import { MobileMenuButton } from './MobileMenuButton'
import { MobileMenuTransition } from './MobileMenuTransition'
import { Logo } from '../Logo'
import { LogoLink } from '../LogoLink'
import { mixins, colors } from '@/styles'

export const MOBILE_HEADER_HEIGHT = 60

type State = {
  isOpen: boolean
}

export class MobileHeader extends React.Component<*, State, *> {
  state = {
    isOpen: false
  }

  // events
  didClickButton = () => {
    this.setState({ isOpen: true })
  }

  didCloseMenu = () => {
    this.setState({ isOpen: false })
  }

  // lifecycle
  render () {
    const { isOpen } = this.state

    return (
      <Header>
        <LogoLink to='/'>
          <Logo height={40} width={40} />
          <h1>LEGISLATED</h1>
        </LogoLink>
        <MobileMenuButton
          onClick={this.didClickButton}
        />
        <MobileMenuTransition>
          {isOpen && (
            <MobileMenu onClose={this.didCloseMenu} />
          )}
        </MobileMenuTransition>
      </Header>
    )
  }
}

const Header = styled.header`
  display: none;

  ${mixins.mobile`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${MOBILE_HEADER_HEIGHT}px;
    padding: 0 15px;
    background-color: ${colors.white};
    z-index: 1;
  `}
`
