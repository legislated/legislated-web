// @flow
import * as React from 'react'
import styled, { css, cx } from 'react-emotion'
import { Link as LinkBase } from './Link'
import type { LinkProps } from './Link'
import { colors } from 'shared/styles'

type Props = {
  isSecondary?: boolean,
} & LinkProps

export function Button ({
  isSecondary,
  className,
  ...linkProps
}: Props) {
  return (
    <Link
      className={cx(
        isSecondary && secondary,
        className
      )}
      {...linkProps}
    />
  )
}

const Link = styled(LinkBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 45px;
  border-radius: 50%;
  color: ${colors.white};
  background-color: ${colors.primary};
`

const secondary = css`
  color: ${colors.primary};
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
`
