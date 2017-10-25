// @flow
type FontFace = {|
  fontFamily: string,
  fontWeight?: number | string
|}

const fontFamily = 'Nunito, sans-serif'

export const fonts: { regular: FontFace, bold: FontFace } = {
  regular: {
    fontFamily,
    fontWeight: 400
  },
  bold: {
    fontFamily,
    fontWeight: 700
  }
}
