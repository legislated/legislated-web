// @flow
import { css } from 'react-emotion'

export const pageWidth = css`
  width: 100%;
  max-width: 1200px;
`

export const pageContent = css`
  ${pageWidth};
  padding-left: 30px;
  padding-right: 30px;
`

export const flexRow = css`
  display: flex;
`

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`

export const flexCenter = css`
  justify-content: center;
  align-items: center;
`

export const fill = css`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
