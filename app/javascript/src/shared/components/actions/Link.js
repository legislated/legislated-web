// @flow
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { cx, css } from 'react-emotion'
import { colors } from '@/styles'

type Location =
  string | Object

type Props = {
  to?: Location,
  onClick?: () => void,
  className?: string,
  children?: React.Node
}

function isAbsoluteUrl (location: Location) {
  return typeof location === 'string' && /https?:\/\//.test(location)
}

export function Link ({
  to: location,
  onClick,
  className,
  children,
  ...otherProps
}: Props) {
  if (!location && !onClick) {
    return null
  }

  const linkProps = {
    className: cx(link, className),
    onClick,
    children,
    ...otherProps
  }

  // use anchor tags for absolute urls, otherwise use a router link
  if (!location || isAbsoluteUrl(location)) {
    return (
      <a
        {...linkProps}
        href={location}
        target='_blank'
        rel='noopener noreferrer'
      />
    )
  } else {
    return (
      <RouterLink
        {...linkProps}
        to={location}
      />
    )
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
