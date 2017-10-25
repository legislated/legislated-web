// @flow
import { isEmpty } from 'lodash'
import type { StyleProp } from 'shared/types'

export function combine (prop: ?StyleProp): Array<Object> {
  if (!prop || isEmpty(prop)) {
    return []
  } else if (Array.isArray(prop)) {
    return prop.filter((o) => !isEmpty(o))
  } else {
    return [prop]
  }
}
