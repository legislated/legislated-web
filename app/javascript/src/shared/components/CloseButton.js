// @flow
import styled, { css } from 'react-emotion'
import { Link } from './Link'
import { colors } from 'shared/styles'

const line = css`
  content: '';
  position: absolute;
  height: 1px;
  width: 136%;
  top: 50%;
  left: -18%;
  background-color: ${colors.primary};
  transition: background-color 0.15s;
`

export const CloseButton = styled(Link)`
  position: relative;
  width: 24px;
  height: 24px;

  &:before {
    ${line};
    transform: rotate(45deg);
  }

  &:after {
    ${line};
    transform: rotate(-45deg);
  }

  &:hover {
    &:before, &:after {
      background-color: ${colors.primaryHighlight};
    }
  }
`
