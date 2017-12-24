// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { NavLink } from './NavLink'

type Props = {
  onClick?: Function
}

export function NavLinkList ({ onClick, location }: Props) {
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

  > * + * {
    margin-left: 30px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }
`
