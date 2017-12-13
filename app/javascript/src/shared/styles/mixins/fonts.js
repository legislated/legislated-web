// @flow
type FontFace = {|
  fontFamily: string,
  fontWeight?: number | string
|}

type Fonts = {|
  light: FontFace,
  regular: FontFace,
  bold: FontFace,
  slabRegular: FontFace
|}

const sans = 'Roboto, sans-serif'
const slab = 'Zilla Slab, serif'

export const fonts: Fonts = {
  light: {
    fontFamily: sans,
    fontWeight: 300
  },
  regular: {
    fontFamily: sans,
    fontWeight: 400
  },
  bold: {
    fontFamily: sans,
    fontWeight: 700
  },
  slabRegular: {
    fontFamily: slab,
    fontWeight: 400
  }
}
