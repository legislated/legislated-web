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
    background-color: ${colors.background};
  }

  h1 {
    ${fonts.slabRegular};
    font-size: 64px;

    @media (max-width: 700px) {
      font-size: 24px;
    }
  }

  h2 {
    ${fonts.slabRegular};
    font-size: 36px;

    @media (max-width: 700px) {
      font-size: 20px;
    }
  }

  h3 {
    ${fonts.slabRegular};
    font-size: 20px;

    @media (max-width: 700px) {
      font-size: 18px;
    }
  }

  h4 {
    ${fonts.slabRegular};
    font-size: 20px
  }

  h5 {
    ${fonts.slabRegular};
    font-size: 16px
  }

  h6 {
    ${fonts.slabRegular};
    font-size: 13px
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
