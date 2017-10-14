/* globals jest */
export function reset () {
  const { history, location, match } = routerProps

  routerProps.history = {
    ...history,
    action: 'PUSH'
  }

  routerProps.local = {
    ...location,
    pathname: ''
  }

  routerProps.match = {
    ...match,
    params: {}
  }
}

const PLACEHOLDER = 'placeholder'

export const routerProps = {
  history: {
    action: PLACEHOLDER,
    replace: jest.fn()
  },
  location: {
    pathname: PLACEHOLDER
  },
  match: {
    params: PLACEHOLDER
  }
}
