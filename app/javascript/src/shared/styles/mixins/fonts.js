// @flow
type FontFace = {|
  fontFamily: string,
  fontWeight?: number | string
|}

const fontFamilies = {
  serif:'Zilla Slab, serif',
  sans:'Roboto, sans-serif'
}

export const fonts: { lightSans: FontFace, regularSans:FontFace, boldSans: FontFace, regularSerif: FontFace } = {
  lightSans: {
    fontFamily: fontFamilies.sans,
    fontWeight: 300
  },
  regularSans: {
    fontFamily: fontFamilies.sans,
    fontWeight: 400
  },
  boldSans: {
    fontFamily: fontFamilies.sans,
    fontWeight: 700
  },
  regularSerif: {
    fontFamily: fontFamilies.serif,
    fontWeight: 400
  }
}
