// @flow
import type { ConcreteBatch, QueryPayload, QueryResponseCache } from 'relay-runtime'

export type RelayCacheResovler = {
  canCacheRequest (
    operation: ConcreteBatch,
    variables: Object
  ): boolean,
  getCachedResponse (
    operation: ConcreteBatch,
    variables: Object,
    cache: QueryResponseCache
  ): ?QueryPayload,
  setCachedResponse (
    operation: ConcreteBatch,
    variables: Object,
    response: QueryPayload,
    cache: QueryResponseCache
  ): void
}
