import { findKey } from 'lodash'
import { glamorMatcher } from './glamorMatcher'

export const toMatchRule = glamorMatcher((wrapper) => {
  return findKey(wrapper.props(), (_, key) => {
    return key.startsWith('data-css')
  })
})
