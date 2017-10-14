// flow-typed signature: 182a8361c46a7145c67666345f38facc
// flow-typed version: <<STUB>>/relay-runtime_v1.1.0/flow_v0.50.0
declare module 'relay-runtime' {
  declare export type Variables = { [key: string]: any }

  declare export type ConcreteFragment = Object

  declare export type ConcreteBatch = {
    name: string,
    text: string,
    query: ConrceteOperation
  }

  declare export type ConrceteOperation = {
    selections: Array<ConcreteSelection>
  }

  declare export type ConcreteSelection = {
    name: string,
    selections?: Array<ConcreteSelection>
  }

  // payload
  declare export type PayloadData = Object

  declare export type PayloadError = {
    message: string,
    locations?: Array<{
      line: number,
      column: number,
    }>
  }

  declare export type QueryResult = {
    data?: PayloadData,
    errors?: Array<PayloadError>
  }

  declare export type QueryPayload = {
    data: PayloadData
  }

  // network
  declare export type FetchFunction = (
    operation: ConcreteBatch,
    variables: Variables
  ) => Promise<QueryResult>

  declare export class Network {
    static create(fetch: FetchFunction): Network;
  }

  // cache
  declare export class QueryResponseCache {
    constructor (options: { size: number, ttl: number }): QueryResponseCache;
    get (queryId: string, variables: Variables): ?QueryPayload;
    set (queryId: string, variables: Variables, data: QueryPayload): void;
  }

  // source
  declare export class RecordSource {
    constructor (): RecordSource;
  }

  // store
  declare export class Store {
    constructor (recordSource: RecordSource): Store;
  }

  // Environment
  declare export class Environment {
    constructor (options: { store: Store, network: Network }): Environment;
  }
}
