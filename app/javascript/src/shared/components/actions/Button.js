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
  ${mixins.font.light};

  height: 48px;
  padding: 15px 30px;
  border-radius: 24px;
  color: ${colors.white};
  background-color: ${colors.primary};
  text-transform: uppercase;
  text-decoration: none;
`

const small = css`
  height: 36px;
  padding: 10px 20px;
  border-radius: 18px;
  font-size: 14px;
`

const secondary = css`
  color: ${colors.primary};
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
`
