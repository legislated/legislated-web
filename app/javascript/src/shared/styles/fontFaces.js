// @flow
import { injectGlobal } from 'react-emotion'
import * as fonts from '../../../fonts'

function fontFace (family: string, variant: string, weight: number) {
  const fontFamily = family.replace(/\s/g, '')
  const fontName = `${fontFamily}$${variant}`

  return `
    @font-face {
      font-family: '${fontFamily}';
      font-style: normal;
      font-weight: ${weight};
      src: url('${fonts[`${fontName}$woff2`]}') format('woff2'),
           url('${fonts[`${fontName}$woff`]}') format('woff');
    }
  `
}

injectGlobal`
  ${fontFace('Roboto', 'Light', 300)}
  ${fontFace('Roboto', 'Regular', 400)}
  ${fontFace('Roboto', 'Bold', 700)}
  ${fontFace('Zilla Slab', 'Regular', 400)}
`
