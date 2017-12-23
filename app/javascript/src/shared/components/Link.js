// @flow
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { cx, css } from 'react-emotion'
import type { Rule } from 'glamor'
import { colors } from 'shared/styles'

export type LinkProps = {
  to?: string,
  onClick?: () => void,
  styles?: Rule,
  className?: string,
  children?: any
}

export function Link ({
  to: url,
  onClick,
  className,
  children,
  ...otherProps
}: LinkProps) {
  if (!url && !onClick) {
    return null
  }

  const linkProps = {
    className: cx(linkClass, className),
    onClick,
    children,
    ...otherProps
  }

  // use anchor tags for absolute urls, otherwise use a router link
  if (!url || /https?:\/\//.test(url)) {
    return <a {...linkProps} href={url} target='_blank' />
  } else {
    return <RouterLink {...linkProps} to={url} />
  }
}

const linkClass = css`
  display: inline-block;
  color: ${colors.primary};
  transition: color 0.1s;

  &:hover {
    color: ${colors.primaryHighlight};
  }
`
