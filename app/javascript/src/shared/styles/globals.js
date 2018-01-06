// @flow
import './fontFaces'
import { injectGlobal } from 'react-emotion'
import { fonts } from './mixins'
import { colors } from './colors'

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
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    text-transform: none;
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
    font-size: 18px;
    background-color: ${colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    ${fonts.regularSlab};
    font-size: 64px;

    @media (max-width: 700px) {
      font-size: 24px;
    }
  }

  h2 {
    ${fonts.regularSlab};
    font-size: 48px;

    @media (max-width: 700px) {
      font-size: 20px;
    }
  }

  h3 {
    ${fonts.regularSlab};
    font-size: 32px;

    @media (max-width: 700px) {
      font-size: 18px;
    }
  }

  h4 {
    ${fonts.regular};
    font-size: 30px;
  }

  h5 {
    ${fonts.regular};
    font-size: 24px;
  }

  h6 {
    ${fonts.bold};
    font-size: 18px;
  }

  a, button {
    cursor: 'pointer'
  }

  ol {
    -webkit-padding-start: 30px;

    @media (max-width: 700px) {
      -webkit-padding-start: 15px;
    }
  }
`
