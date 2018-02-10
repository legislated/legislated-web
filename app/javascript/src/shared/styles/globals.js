// @flow
import './resets'
import './fontFaces'
import { injectGlobal } from 'react-emotion'
import { white } from './colors'
import { fonts, fontSizes, flexColumn } from './mixins'

injectGlobal`
  body {
    ${flexColumn};
    ${fonts.regular};
    ${fontSizes.body};

    background-color: ${white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  div[data-hypernova-key='client'] {
    ${flexColumn};
  }

  h1 {
    ${fonts.regularSlab};
    ${fontSizes.h1};
  }

  h2 {
    ${fonts.regularSlab};
    ${fontSizes.h2};
  }

  h3 {
    ${fonts.regularSlab};
    ${fontSizes.h3};
  }

  h4 {
    ${fonts.regular};
    ${fontSizes.h4};
  }

  h5 {
    ${fonts.regular};
    ${fontSizes.h5};
  }

  h6 {
    ${fonts.bold};
    ${fontSizes.h6};
  }

  a, button, input {
    cursor: pointer;
  }
`
