// @flow
import { css } from 'react-emotion'
import { mobile } from '../mobile'

function size (sizes: { desktop: number, mobile: number }) {
  return css`
    font-size: ${sizes.desktop}px;

    ${mobile`
      font-size: ${sizes.mobile}px;
    `}
  `
}

export const h1 = size({ desktop: 54, mobile: 36 })
export const h2 = size({ desktop: 40, mobile: 26 })
export const h3 = size({ desktop: 26, mobile: 20 })
export const h4 = size({ desktop: 24, mobile: 18 })
export const h5 = size({ desktop: 20, mobile: 16 })
export const h6 = size({ desktop: 16, mobile: 14 })
export const body = h6
