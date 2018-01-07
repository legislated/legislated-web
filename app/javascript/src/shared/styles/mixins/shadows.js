// @flow
import { neutral, primaryHighlight } from '../colors'

type ShadowStyle = {|
  borderRadius: number,
  boxShadow: string
|}

export function make (color: string, height: number): ShadowStyle {
  return {
    borderRadius: height,
    boxShadow: `${color} 0 ${height}px 0 0`
  }
}

export const low = make(neutral, 3)
export const high = make(primaryHighlight, 4)
