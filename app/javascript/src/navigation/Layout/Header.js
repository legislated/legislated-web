// @flow
import * as React from 'react'
import { findDOMNode as findDomNode } from 'react-dom'
import styled, { css } from 'react-emotion'
import { Logo } from './Logo'
import { LogoLink } from './LogoLink'
import { NavLinks } from './NavLinks'
import { mixins, colors } from 'shared/styles'
import { TranslateAndFade } from 'shared/components'

type State = {
  isSticky: boolean
}

export class Header extends React.Component<*, *, State> {
  state = {
    isSticky: false
  }

  // refs
  navbar: ?Object = null

  // actions
  setStickyHeader = (navbar: ?Object) => {
    this.navbar = navbar
    navbar && this.invalidateIsSticky(navbar)
  }

  invalidateIsSticky = (navbar: ?Object) => {
    this.setState(() => {
      const node = findDomNode(navbar)
      const parent = node && node.parentElement
      const isSticky = parent && parent.getBoundingClientRect().top < 0
      return { isSticky }
    })
  }

  // events
  didScroll = () => {
    this.invalidateIsSticky(this.navbar)
  }

  // lifecycle
  componentDidMount () {
    window.addEventListener('scroll', this.didScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.didScroll)
  }

  render () {
    const { isSticky } = this.state

    return (
      <Container>
        <Hero>
          <Logo width={73} height={61} />
          <h1>Legislated</h1>
        </Hero>
        <Navbar>
          <Sticky
            ref={(ref) => { this.navbar = ref }}
            style={isSticky ? { position: 'fixed', top: '0px' } : {}}
          >
            <TranslateAndFade component={StickyLogo} direction='down'>
              {isSticky && (
                <div>
                  <LogoLink to='/'>
                    <Logo width={62} height={52} />
                    <h2>Legislated</h2>
                  </LogoLink>
                </div>
              )}
            </TranslateAndFade>
            <NavLinks />
          </Sticky>
        </Navbar>
      </Container>
    )
  }
}

const column = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  ${column};
  padding-top: 70px;

  ${mixins.mobile`
    display: none;
  `}
`

const Hero = styled.div`
  ${column}
  margin-bottom: 45px;

  > img {
    margin-bottom: 20px;
  }
`

const height = '78px'
const Navbar = styled.div`
  position: relative;
  height: ${height};
  width: 100%;
`

const Sticky = styled.header`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height};
  padding: 0 20px;
  background-color: ${colors.background};
  z-index: 1;

  &:after {
    content: '';
    flex: 1;
  }
`

const StickyLogo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-right: 30px;
`
