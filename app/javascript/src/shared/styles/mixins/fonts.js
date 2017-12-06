// @flow
type FontFace = {|
  fontFamily: string,
  fontWeight?: number | string
|}

const fontFamilies = {
  slab: 'Zilla Slab, serif',
  sans: 'Roboto, sans-serif'
}

export const fonts: { light: FontFace, regular:FontFace, bold: FontFace, regularSlab: FontFace } = {
  light: {
    fontFamily: fontFamilies.sans,
    fontWeight: 300
  },
  regular: {
    fontFamily: fontFamilies.sans,
    fontWeight: 400
  },
  bold: {
    fontFamily: fontFamilies.sans,
    fontWeight: 700
  },
  regularSlab: {
    fontFamily: fontFamilies.slab,
    fontWeight: 400
  }
}
