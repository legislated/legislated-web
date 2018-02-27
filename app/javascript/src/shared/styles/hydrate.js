// @flow
import { hydrate } from 'emotion'
import { fromScript } from 'hypernova'
import { config } from '@/config'

if (config.env !== 'server') {
  const ids = fromScript({ key: 'emotion-ids' })
  ids && hydrate(ids)
}
