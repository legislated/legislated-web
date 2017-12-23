// @flow
import * as React from 'react'
import { findDOMNode as findDomNode } from 'react-dom'
import styled from 'react-emotion'
import { NavLinkList } from './NavLinkList'
import { logo } from '../../../images'
import { colors } from 'shared/styles'

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
        <Icon
          src={logo}
          alt='Quill and Paper'
          width='73'
          height='61'
        />
        <Title
          children='Legislated'
        />
        <Navbar>
          <Sticky
            style={isSticky ? ({
              position: 'fixed',
              top: '0px'
            }) : {}}
            ref={(ref) => { this.navbar = ref }}
          >
            <NavLinkList />
          </Sticky>
        </Navbar>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;

  @media (max-width: 700px) {
    display: none;
  }
`

const Icon = styled.img`
  width: 73px;
  height: 61px;
  margin-bottom: 20px;
`

const Title = styled.h1`
  margin-bottom: 45px;
`

const height = '78px'
const Navbar = styled.div`
  position: relative;
  height: ${height};
  width: 100%;
`

const Sticky = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height};
  background-color: ${colors.background};
  z-index: 1;
`
