// @flow
export const utils = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  fill: (inset: number = 0): Object => ({
    position: 'absolute',
    top: inset,
    left: inset,
    right: inset,
    bottom: inset
  }),
  inset: (value: number): Object => ({
    margin: value
  })
}
