import { identity } from 'lodash'

// actual
const {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Link
} = require.requireActual('react-router-dom')

// mock
export {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link,
  identity as withRouter
}
