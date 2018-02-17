// @flow
import './resets'
import './fonts'
import { injectGlobal } from 'react-emotion'
import { black, white } from './colors'
import { font, flexColumn } from './mixins'

injectGlobal`
  body {
    ${flexColumn};
    ${font.regular};
    ${font.sizes.body};

    line-height: 1.25;
    color: ${black};
    background-color: ${white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  div[data-hypernova-key='client'] {
    ${flexColumn};
  }

  h1 {
    ${font.regularSlab};
    ${font.sizes.h1};
  }

  h2 {
    ${font.regularSlab};
    ${font.sizes.h2};
  }

  h3 {
    ${font.regularSlab};
    ${font.sizes.h3};
  }

  h4 {
    ${font.regular};
    ${font.sizes.h4};
  }

  h5 {
    ${font.regular};
    ${font.sizes.h5};
  }

  h6 {
    ${font.bold};
    ${font.sizes.h6};
  }

  a, button, input {
    cursor: pointer;
  }
`
