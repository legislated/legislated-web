const hypernova = require('hypernova/server')

hypernova({
  devMode: true,
  getComponent: (_) => require('./public/packs/server').default,
  port: 3030 || process.env.HYPERNOVA_PORT
})
