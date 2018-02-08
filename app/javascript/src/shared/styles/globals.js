// @flow
import './fontFaces'
import { injectGlobal } from 'react-emotion'
import { white } from './colors'
import { fonts, fontSizes } from './mixins'

// extra resets
injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  button {
    text-transform: none;
  }

  button, input {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font-size: inherit;
    font-family: inherit;
  }

  a, button, input {
    cursor: pointer;
  }

  input:focus {
    cursor: text;
    outline: none;
  }

  ul {
    margin: 0;
  }

  ol {
    -webkit-margin-after: 0;
    -webkit-margin-before: 0;
  }
`

// global rules
injectGlobal`
  body {
    ${fonts.regular};
    ${fontSizes.body};

    background-color: ${white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

  a, button {
    cursor: pointer;
  }
`
