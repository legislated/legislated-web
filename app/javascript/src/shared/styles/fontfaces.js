// @flow
import { css } from 'glamor'
import robotoLightWOFF2 from '../../../fonts/roboto-light.woff2'
import robotoLightWOFF from '../../../fonts/roboto-light.woff'
import robotoLightTTF from '../../../fonts/roboto-light.ttf'

import robotoRegularWOFF2 from '../../../fonts/roboto-regular.woff2'
import robotoRegularWOFF from '../../../fonts/roboto-regular.woff'
import robotoRegularTTF from '../../../fonts/roboto-regular.ttf'

import robotoBoldWOFF2 from '../../../fonts/roboto-bold.woff2'
import robotoBoldWOFF from '../../../fonts/roboto-bold.woff'
import robotoBoldTTF from '../../../fonts/roboto-bold.ttf'

import zillaSlabRegularWOFF2 from '../../../fonts/zillaslab-regular.woff2'
import zillaSlabRegularWOFF from '../../../fonts/zillaslab-regular.woff'
import zillaSlabRegularTTF from '../../../fonts/zillaslab-regular.ttf'

css.insert(`
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src:local('Roboto Light'), local('Roboto-Light'),
      url('${robotoLightWOFF2}') format('woff2'),
      url('${robotoLightWOFF}') format('woff'),
      url('${robotoLightTTF}') format('truetype');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src:local('Roboto'), local('Roboto-regular'),
      url('${robotoRegularWOFF2}') format('woff2'),
      url('${robotoRegularWOFF}') format('woff'),
      url('${robotoRegularTTF}') format('truetype');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src:local('Roboto Bold'), local('Roboto-Bold'),
      url('${robotoBoldWOFF2}') format('woff2'),
      url('${robotoBoldWOFF}') format('woff'),
      url('${robotoBoldTTF}') format('truetype');
}
@font-face {
  font-family: 'Zilla Slab';
  font-style: normal;
  font-weight: 400;
  src:local('Zilla Slab'), local('ZillaSlab-Regular'),
      url('${zillaSlabRegularWOFF2}') format('woff2'),
      url('${zillaSlabRegularWOFF}') format('woff'),
      url('${zillaSlabRegularTTF}') format('truetype');
}
`)