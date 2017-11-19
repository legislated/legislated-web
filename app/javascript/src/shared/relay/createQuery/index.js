// @flow
import 'isomorphic-fetch'
import config from 'shared/config'

export const { createQuery } = config.env === 'server'
  ? require('./createQuery.server.js')
  : require('./createQuery.client.js')

export { cacheResolvers } from './cacheResolvers'
