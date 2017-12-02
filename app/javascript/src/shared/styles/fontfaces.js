// @flow
import { css } from 'glamor'
import * as fonts from '../../../fonts'

css.insert(`
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src:local('Roboto Light'), local('Roboto-Light'),
      url('${fonts.robotoLightWoff2}') format('woff2'),
      url('${fonts.robotoLightWoff}') format('woff');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src:local('Roboto'), local('Roboto-regular'),
      url('${fonts.robotoRegularWoff2}') format('woff2'),
      url('${fonts.robotoRegularWoff}') format('woff');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src:local('Roboto Bold'), local('Roboto-Bold'),
      url('${fonts.robotoBoldWoff2}') format('woff2'),
      url('${fonts.robotoBoldWoff}') format('woff');
}
@font-face {
  font-family: 'Zilla Slab';
  font-style: normal;
  font-weight: 400;
  src:local('Zilla Slab'), local('ZillaSlab-Regular'),
      url('${fonts.zillaSlabRegularWoff2}') format('woff2'),
      url('${fonts.zillaSlabRegularWoff}') format('woff');
}
`)
