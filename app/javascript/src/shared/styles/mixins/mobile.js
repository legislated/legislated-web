// @flow
export const query = '@media (max-width: 700px)'

export function mobile (styles: Object): Object {
  return { [query]: { ...styles } }
}
