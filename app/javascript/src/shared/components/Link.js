// @flow
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { cx, css } from 'react-emotion'
import type { Rule } from 'glamor'
import { colors } from '@/styles'

type Props = {
  to?: string,
  onClick?: () => void,
  styles?: Rule,
  className?: string,
  children?: React.Node
}

export function Link ({
  to: url,
  onClick,
  className,
  children,
  ...otherProps
}: Props) {
  if (!url && !onClick) {
    return null
  }

  const linkProps = {
    className: cx(link, className),
    onClick,
    children,
    ...otherProps
  }

  // use anchor tags for absolute urls, otherwise use a router link
  if (!url || /https?:\/\//.test(url)) {
    return <a {...linkProps} href={url} target='_blank' />
  } else {
    // $FlowFixMe: update react-router-dom flow libdefs
    return <RouterLink {...linkProps} to={url} />
  }
}

const link = css`
  color: ${colors.primary};
  transition: color 0.1s;

  &:hover {
    color: ${colors.primaryHighlight};
  }
`

export type { Props as LinkProps }
