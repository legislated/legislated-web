const hypernova = require('hypernova/server')
const createRunPacks = require('./createRunPacks')

const runPack = createRunPacks({
  client: 'server'
})

// start hypernova server
hypernova({
  devMode: process.env.DEBUG === 'true',
  port: 3030,
  getComponent: runPack,
  getCpus (cpus) {
    return Math.max(4, cpus)
  }
})
