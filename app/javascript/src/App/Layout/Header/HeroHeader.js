// @flow
import * as React from 'react'
import { findDOMNode as findDomNode } from 'react-dom'
import styled from 'react-emotion'
import { HeaderNavbar } from './HeaderNavbar'
import { Logo } from '../Logo'
import { mixins } from '@/styles'

type State = {
  isSticky: boolean
}

export class HeroHeader extends React.Component<{}, State> {
  state = {
    isSticky: false
  }

  // refs
  navbar: ?Object = null

  // actions
  setNavbar = (navbar: ?Object) => {
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
        <HeaderNavbar
          isSticky={isSticky}
          navbarRef={this.setNavbar}
        />
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
