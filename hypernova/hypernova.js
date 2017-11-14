const { resolve } = require('path')
const hypernova = require('hypernova/server')
const requireFromUrl = require('./requireFromUrl')

// load webpack config
const { devServer, output } = require(resolve(`./config/webpack`, process.env.NODE_ENV))
const { path: packsPath } = output
const devServerUrl = `http://${devServer.host}:${devServer.port}`

// run
const { run } = hypernova.createVM({ cacheSize: 1 })

// start hypernova server
hypernova({
  devMode: true,
  port: 3030,
  getComponent: async (name) => {
    const manifest = require(resolve(packsPath, 'manifest.json'))
    const packName = manifest[`${name}.js`]
    const filePath = `${devServerUrl}${packName}`
    console.log(`ssr [name: ${name}] fetching ${filePath}`)

    const pack = await requireFromUrl(filePath)
    console.log(`ssr [name: ${name}] rendering pack`)

    try {
      const Component = run(name, pack)
      console.log(`ssr [name: ${name}] rendered ${Component}`)
      return Component
    } catch (error) {
      console.error(`ssr [name: ${name}] rendering failed with error:`)
      console.error(error)
      return null
    }
  }
})
