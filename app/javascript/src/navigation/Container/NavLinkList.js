// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { withRouter } from 'react-router-dom'
import { NavLink } from './NavLink'

type Props = {
  onClick?: Function
}

let NavLinkList = function NavLinkList ({ onClick, location }: Props) {
  const linkProps = {
    onClick
  }

  return (
    <Nav>
      <NavLink {...linkProps} to='/' children='Home' />
      <NavLink {...linkProps} to='#' children='Bills' />
      <NavLink {...linkProps} to='/faq' children='FAQ' />
      <NavLink {...linkProps} to='/about' children='About Us' />
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;

  > a + a {
    margin-left: 30px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

NavLinkList = withRouter(NavLinkList)

export { NavLinkList }
