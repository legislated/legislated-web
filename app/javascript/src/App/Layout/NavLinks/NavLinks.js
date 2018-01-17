// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { NavLink } from './NavLink'
import { mixins, values } from '@/styles'

type Props = {
  onClick?: Function,
  className?: string
}

export function NavLinks ({
  onClick,
  className
}: Props) {
  const linkProps = {
    onClick
  }

  return (
    <Nav className={className}>
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
    margin-left: 25px;
  }

  ${mixins.mobile`
    flex-direction: column;

    > * + * {
      margin-left: 0;
      margin-top: 15px;
    }
  `}
`
