// @flow
import type { Connection } from 'shared/types'

export function unwrap<T> (connection: ?Connection<T>): Array<T> {
  return connection ? connection.edges.map((edge) => edge.node) : []
}
