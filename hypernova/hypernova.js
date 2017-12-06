const { resolve } = require('path')
const hypernova = require('hypernova/server')
const fetchPack = require('./fetchPack')

// run
const { run } = hypernova.createVM({ cacheSize: 1 })

// start hypernova server
hypernova({
  devMode: true,
  port: 3030,
  getComponent: async (name) => {
    const pack = await fetchPack(name)
    const { default: Component } = run(name, pack)
    return Component
  }
})
