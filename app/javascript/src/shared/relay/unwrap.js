// @flow
import type { Connection } from '@/types'

export function unwrap<T> (connection: ?Connection<T>): Array<T> {
  return connection ? connection.edges.map((edge) => edge.node) : []
}
