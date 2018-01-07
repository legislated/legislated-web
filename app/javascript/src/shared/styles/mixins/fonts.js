// @flow
import { css } from 'react-emotion'

const sans = 'Roboto, sans-serif'
const slab = 'Zilla Slab, serif'

export const light = css`
  font-family: ${sans};
  font-weight: 300;
`

export const regular = css`
  font-family: ${sans};
  font-weight: 400;
`

export const bold = css`
  font-family: ${sans};
  font-weight: 700;
`

export const regularSlab = css`
  font-family: ${slab};
  font-weight: 400;
`
