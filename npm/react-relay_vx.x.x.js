// flow-typed signature: c38775fd973f865f6c2eb3162c2bf92e
// flow-typed version: <<STUB>>/react-relay_v1.1.0/flow_v0.50.0
declare module 'react-relay' {
  declare type Environment = Object
  declare export type Variables = { [key: string]: any }
  declare export type Disposable = {
	  dispose(): void
	}

  // graphql
  declare export type GraphQL = mixed
  declare export function graphql(
    strings: Array<strings>
  ): GraphQL

  // relay props
  declare export type RefetchOptions = {
    force?: boolean
  }

  declare export type RelayProp = {
    environment: Environment
  }

  declare export type RelayPaginationProp = RelayProp & {
    hasMore: () => boolean,
    isLoading: () => boolean,
    loadMore: (
      pageSize: number,
      callback: (error: ?Error) => void,
      options?: RefetchOptions,
    ) => ?Disposable,
    refetchConnection: (
      totalCount: number,
      callback: (error: ?Error) => void,
      refetchVariables: ?Variables,
    ) => ?Disposable,
  }

  declare export type RelayRefetchProp = RelayProp & {
    refetch: (
      refetchVariables: Variables | ((fragmentVariables: Variables) => Variables),
      renderVariables: ?Variables,
      callback: ?(error: ?Error) => void,
      options?: RefetchOptions,
    ) => Disposable,
  }

  // containers
  declare export function createFragmentContainer<P> (
    Component: ReactClass<P>,
    query: GraphQL
  ): ReactClass<$Diff<P, RelayProp>>

  declare export function createRefetchContainer<P>(
    Component: ReactClass<P>,
    fragment: GraphQL,
    query: GraphQL
  ): ReactClass<$Diff<P, RelayRefetchProp>>

  declare export function createPaginationContainer<P>(
    Component: ReactClass<P>,
    fragment: GraphQL,
    query: PaginationConfig
  ): ReactClass<$Diff<P, RelayPaginationProp>>

  declare export type PaginationConfig = {
    direction?: 'backward' | 'forward',
    getConnectionFromProps?: (props: Object) => ?ConnectionData,
    getFragmentVariables?: (
      prevVars: Variables,
      totalCount: number
    ) => Variables,
    getVariables: (
      props: Object,
      paginationInfo: {count: number, cursor: ?string},
      fragmentVariables: Variables,
    ) => Variables,
    query: GraphQL
  }

  declare export type ConnectionData = {
    edges?: ?Array<any>,
    pageInfo?: ?PageInfo
  }

  declare export type PageInfo = {
    endCursor: ?string,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    startCursor: ?string
  }

  // query renderer
  declare export type QueryRendererProps = {
    environment: Environment,
    query: ?GraphQL,
    variables: Variables,
    render: (readyState: ReadyState) => ?React$Element<*>,
    cacheConfig?: CacheConfig
  }

  declare export type CacheConfig = {
    force?: boolean,
    poll?: number,
  }

  declare export type ReadyState = {
    error: ?Error,
    props: ?Object,
    retry: ?() => void,
  }

  declare export class QueryRenderer extends React$Component {
    props: QueryRendererProps
  }
}
