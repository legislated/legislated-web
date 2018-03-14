import { identity } from 'lodash'

// actual
const {
  QueryRenderer
} = require.requireActual('react-relay')

// mock
export {
  QueryRenderer,
  identity as graphql,
  identity as createFragmentContainer,
  identity as createRefetchContainer,
  identity as createPaginationContainer
}
