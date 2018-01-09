// @flow
import * as React from 'react'
import styled, { cx, css } from 'react-emotion'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { Link } from '@/components'
import type { LinkProps } from '@/components'
import { mixins, colors } from '@/styles'
import { removeRouterProps } from '@/functions'

type Props
  = LinkProps
  & ContextRouter

let NavLink = function NavLink ({ to: url, className, location, ...otherProps }: Props) {
  return (
    <Container
      aria-current={location.pathname === url ? 'page' : false}
    >
      <Link
        {...removeRouterProps(otherProps)}
        to={url}
        className={cx(linkClass, className)}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  ${mixins.mobile`
    padding-bottom: 10px;
  `}

  &[aria-current='page'] {
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 4px;
      bottom: -2px;
      background-color: ${colors.primary} ;
    }

    > * {
      color: ${colors.primary};
    }
  }
`

const linkClass = css`
  ${css(mixins.fonts.light)};

  font-size: 24px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${colors.black};

  &:hover {
    color: ${colors.primary};
  }
`

NavLink = withRouter(NavLink)

export { NavLink }
