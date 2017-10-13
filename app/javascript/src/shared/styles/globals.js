// @flow
import 'glamor/reset'
import { each } from 'lodash'
import { css } from 'glamor'
import { mixins } from './mixins'
import { colors } from './colors'
import { query } from './mixins/mobile'

// extra resets
css.insert(`
ol {
  -webkit-margin-after: 0;
  -webkit-margin-before: 0;
  -webkit-padding-start: 30px;
}
`)

// global rules
function globals (definitions) {
  each(definitions, (definition, selector) => {
    css.global(selector, definition)
  })
}

globals({
  html: {
    lineHeight: 1.3
  },
  body: {
    backgroundColor: colors.background
  },
  'p, h1, h2, h3, h4, h5, h6, ul': {
    margin: 0
  },
  'p, span, div': {
    lineHeight: 1.4
  },
  h1: {
    fontSize: 28
  },
  h2: {
    fontSize: 24
  },
  h3: {
    fontSize: 20
  },
  h4: {
    ...mixins.fonts.regular,
    fontSize: 20
  },
  h5: {
    ...mixins.fonts.bold,
    fontSize: 16
  },
  a: {
    cursor: 'pointer'
  },
  button: {
    margin: 0,
    padding: 0,
    border: 0,
    textTransform: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer'
  }
})

// hack around the fact that glamor doesn't parse media queries out of
// css.global properly
// see: https://github.com/threepointone/glamor/issues/202
css.insert(`
${query} {
  h1 { font-size: 24px; }
  h2 { font-size: 20px; }
  h3, h4 { font-size: 18px; }
  ol {
    -webkit-padding-start: 15px
  }
}
`)
