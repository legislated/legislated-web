// @flow
import { hydrate } from 'emotion'
import { fromScript } from 'hypernova'
import { config } from '@/config'

if (config.isClient) {
  const ids = fromScript({ key: 'emotion-ids' })
  ids && hydrate(ids)
}
