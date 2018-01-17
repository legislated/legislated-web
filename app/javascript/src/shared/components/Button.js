// @flow
import * as React from 'react'
import styled, { css, cx } from 'react-emotion'
import { Link as Link$ } from './Link'
import type { LinkProps } from './Link'
import { colors, mixins } from '@/styles'

type Props = {
  isSmall?: boolean,
  isSecondary?: boolean,
} & LinkProps

export function Button ({
  isSmall,
  isSecondary,
  className,
  ...linkProps
}: Props) {
  return (
    <Link
      className={cx(
        !!isSmall && small,
        !!isSecondary && secondary,
        className
      )}
      {...linkProps}
    />
  )
}

const Link = styled(Link$)`
  ${mixins.flexRow};
  ${mixins.flexCenter};
  ${mixins.fonts.light};

  height: 60px;
  padding: 0 45px;
  border-radius: 30px;
  color: ${colors.white};
  background-color: ${colors.primary};
  text-transform: uppercase;
  text-decoration: none;
`

const small = css`
  height: 44px;
  padding: 13px 25px;
  border-radius: 22px;
  font-size: 16px;
`

const secondary = css`
  color: ${colors.primary};
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
`
