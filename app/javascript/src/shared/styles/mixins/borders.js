// @flow
import { capitalize } from 'lodash'
import { colors } from '../colors'

type BorderStyle = {
  borderTop?: string,
  borderBottom?: string,
  borderLeft?: string,
  borderRight?: string,
}

type BorderEdge = 'top' | 'bottom' | 'left' | 'right'
type BorderCreator = (edges?: Array<BorderEdge>) => BorderStyle

// creator
function borderCreator (color: string): BorderCreator {
  const border = `1px solid ${color}`

  return function (edges = ['top', 'bottom', 'left', 'right']) {
    return edges.reduce((memo, edge) => ({
      ...memo,
      [`border${capitalize(edge)}`]: border
    }), {})
  }
}

// exports
export const borders = {
  low: borderCreator(colors.neutralShadow),
  high: borderCreator(colors.primary)
}
