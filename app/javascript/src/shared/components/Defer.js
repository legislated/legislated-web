// @flow
import config from 'shared/config'

export function Defer (children: any) {
  return config.env === 'server' ? null : children
}
