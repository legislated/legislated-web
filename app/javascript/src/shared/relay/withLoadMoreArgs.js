// @flow
type LoadMoreContainerArgs = {
  query: mixed,
  getConnectionFromProps: (props: Object) => Object
}

export function withLoadMoreArgs (args: LoadMoreContainerArgs): Object {
  return {
    ...args,
    direction: 'forward',
    getFragmentVariables (prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables (props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor
      }
    }
  }
}
