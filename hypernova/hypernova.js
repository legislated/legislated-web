const hypernova = require('hypernova/server')
const createRunPacks = require('./createRunPacks')
const log = require('./log')

const runPack = createRunPacks({
  client: 'server'
})

// start hypernova server
hypernova({
  devMode: process.env.DEBUG === 'true',
  port: 3030,
  getComponent: runPack,
  getCPUs (cpus) {
    const workers = Math.max(4, cpus)
    log.info(null, `starting ${workers} workers`)
    return workers
  }
})
