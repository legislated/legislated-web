// @flow
import { css } from 'react-emotion'

const query = '@media (max-width: 700px)'

export const mobile = (...args: mixed[]) => css`
  ${query} {
    ${css(...args)};
  }
`

mobile.glam = function mobile (styles: Object): Object {
  return { [query]: { ...styles } }
}
