// @flow
import './fontFaces'
import { injectGlobal } from 'react-emotion'
import { fonts } from './mixins'
import { white } from './colors'

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
    font-size: 16px;
    background-color: ${white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    ${fonts.regularSlab};
    font-size: 54px;
  }

  h2 {
    ${fonts.regularSlab};
    font-size: 40px;
  }

  h3 {
    ${fonts.regularSlab};
    font-size: 26px;
  }

  h4 {
    ${fonts.regular};
    font-size: 24px;
  }

  h5 {
    ${fonts.regular};
    font-size: 20px;
  }

  h6 {
    ${fonts.bold};
    font-size: 16px;
  }

  a, button {
    cursor: pointer;
  }
`
