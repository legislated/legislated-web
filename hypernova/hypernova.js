const { resolve } = require('path')
const hypernova = require('hypernova/server')
const requireFromUrl = require('./requireFromUrl')

// load webpack config
const { devServer, output } = require(resolve(`./config/webpack`, process.env.NODE_ENV))
const { path: packsPath } = output
const devServerUrl = `http://${devServer.host}:${devServer.port}`

// run
const { run } = hypernova.createVM({ cacheSize: 0 })

// start hypernova server
hypernova({
  devMode: true,
  port: 3030,
  getComponent: async (name) => {
    const manifest = require(resolve(packsPath, 'manifest.json'))
    const packName = manifest[`${name}.js`]

    if (packName == null) {
      console.log(`ssr [name: ${name}] missing pack in manifest`, manifest)
    }

    const filePath = `${devServerUrl}${packName}`
    console.log(`ssr [name: ${name}] fetching ${filePath}`)

    const pack = await requireFromUrl(filePath)
    console.log(`ssr [name: ${name}] loading pack`)

    const { default: Component } = run(name, pack)
    console.log(`ssr [name: ${name}] loaded:`, Component)

    return Component
  }
})
