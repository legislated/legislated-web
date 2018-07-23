// @flow
import 'isomorphic-fetch'
import { config } from '@/config'

export const { createQuery } = config.isServer
  ? require('./createQuery.server.js')
  : require('./createQuery.client.js')
