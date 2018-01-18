// @flow
import * as React from 'react'
import { findDOMNode as findDomNode } from 'react-dom'
import styled from 'react-emotion'
import { Logo } from './Logo'
import { LogoLink } from './LogoLink'
import { NavLinks } from './NavLinks'
import { TranslateAndFade } from '@/components'
import { mixins, colors } from '@/styles'

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
          <Logo width={58} height={49} />
          <h1>Legislated</h1>
        </Hero>
        <Navbar>
          <StickyBar
            ref={(ref) => { this.navbar = ref }}
            style={isSticky ? { position: 'fixed', top: '0px' } : {}}
          >
            <TranslateAndFade component={StickyLogo} direction='down'>
              {isSticky && (
                <div>
                  <LogoLink to='/'>
                    <Logo width={40} height={34} />
                    <h2>Legislated</h2>
                  </LogoLink>
                </div>
              )}
            </TranslateAndFade>
            <Nav />
          </StickyBar>
        </Navbar>
      </Container>
    )
  }
}

const Container = styled.header`
  ${mixins.flexColumn};

  align-items: center;
  padding-top: 70px;

  ${mixins.mobile`
    display: none;
  `}
`

const Hero = styled.div`
  ${mixins.flexColumn};

  align-items: center;
  margin-bottom: 30px;

  > img {
    margin-bottom: 15px;
  }
`

const height = 70
const Navbar = styled.div`
  position: relative;
  height: ${height}px;
  width: 100%;
`

const StickyBar = styled.div`
  ${mixins.flexRow};

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height}px;
  padding: 0 25px;
  z-index: 1;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray4};

  &:after {
    content: '';
    flex: 1;
  }
`

const StickyLogo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Nav = styled(NavLinks)`
  margin: 0 25px;
`
