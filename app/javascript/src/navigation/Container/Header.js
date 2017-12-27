// @flow
import * as React from 'react'
import { findDOMNode as findDomNode } from 'react-dom'
import styled, { css } from 'react-emotion'
import { HeaderIcon } from './HeaderIcon'
import { NavLinkList } from './NavLinkList'
import { colors } from 'shared/styles'
import { Link, TranslateAndFade } from 'shared/components'

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
        <Logo>
          <HeaderIcon width={73} height={61} />
          <h1>Legislated</h1>
        </Logo>
        <Navbar>
          <Sticky
            ref={(ref) => { this.navbar = ref }}
            style={isSticky ? { position: 'fixed', top: '0px' } : {}}
          >
            <TranslateAndFade component={StickyLogoWrapper} direction='down'>
              {isSticky && (
                <div>
                  <StickyLogo to='/'>
                    <HeaderIcon width={62} height={52} />
                    <h2>Legislated</h2>
                  </StickyLogo>
                </div>
              )}
            </TranslateAndFade>
            <NavLinkList />
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
  ${column}
  padding-top: 70px;

  @media (max-width: 700px) {
    display: none;
  }
`

const Logo = styled.div`
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

const Sticky = styled.div`
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

const StickyLogoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const StickyLogo = styled(Link)`
  display: flex;
  align-items: center;
  color: ${colors.black};
  text-decoration: none;

  &:hover {
    color: ${colors.primary};
  }

  > img {
    margin-right: 20px;
  }
`
