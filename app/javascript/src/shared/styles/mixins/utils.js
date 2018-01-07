// @flow
import { css } from 'react-emotion'
import { margin } from '../values'

export const pageWidth = css`
  max-width: 1140px;
`

export const pageMargin = css`
  margin-left: ${margin}px;
  margin-right: ${margin}px;
`

export const flexRow = css`
  display: flex;
`

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`

export const fill = css`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
