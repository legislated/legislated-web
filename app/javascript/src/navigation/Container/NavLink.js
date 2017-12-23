// @flow
import * as React from 'react'
import { cx, css } from 'react-emotion'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { Link } from 'shared/components'
import type { LinkProps } from 'shared/components'
import { mixins, colors } from 'shared/styles'
import { withoutRouter } from 'shared/functions'

type Props
  = LinkProps
  & ContextRouter

let NavLink = function NavLink ({ to: url, className, location, ...otherProps }: Props) {
  return (
    <Link
      {...withoutRouter(otherProps)}
      to={url}
      className={cx(linkClass, className)}
      aria-current={location.pathname === url ? 'page' : false}
    />
  )
}

const linkClass = css`
  ${css(mixins.fonts.light)};

  font-size: 24px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${colors.black};

  &:hover {
    color: ${colors.primary};
  }

  &[aria-current='page'] {
    color: ${colors.primary};
  }
`

NavLink = withRouter(NavLink)

export { NavLink }
