// @flow
import { borders } from './borders'
import { fonts } from './fonts'
import { shadows } from './shadows'
import { utils } from './utils'
import { mobile } from './mobile'

export const mixins = {
  ...utils,
  mobile,
  fonts,
  borders,
  shadows
}
