// @flow
import { colors } from '../colors'

type ShadowStyle = {|
  borderRadius: number,
  boxShadow: string
|}

function make (color: string, height: number): ShadowStyle {
  return {
    borderRadius: height,
    boxShadow: `${color} 0 ${height}px 0 0`
  }
}

export const shadows = {
  make,
  low: () => make(colors.neutralShadow, 3),
  high: () => make(colors.primaryHighlight, 4)
}
