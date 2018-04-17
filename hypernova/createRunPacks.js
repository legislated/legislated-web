const { createVM } = require('hypernova/server')
const fetchPack = require('./fetchPack')
const log = require('./log')
const { keys } = Object

function createPackUtils (nameMap) {
  const { run: runPack } = createVM({
    cacheSize: keys(nameMap).length
  })

  async function fetch (name) {
    log.info(name, 'START - fetch pack')
    const pack = await fetchPack(nameMap[name])
    log.debug(name, `FINISH - fetched pack: ${pack != null ? 'some' : 'none'}`)
    return pack
  }

  function run (name, pack) {
    log.debug(name, `START - produce module from pack: ${pack != null ? pack.length : -1} chars`)
    const module = runPack(name, pack).default
    log.debug(name, `FINISH -  produced module: ${module != null ? 'some' : 'none'}`)

    return module
  }

  async function resolve (name) {
    log.info(name, 'START - resolve pack')

    const pack = await fetch(name)
    log.debug(name, `fetched pack code: ${pack != null ? 'some' : 'none'}`)

    const resolved = run(name, pack)
    log.debug(name, 'FINISH - resolve pack')

    return resolved
  }

  return { run, fetch, resolve }
}

// creates a function that runs a named pack w/ no cache
function createRunPacks (nameMap) {
  const { resolve } = createPackUtils(nameMap)
  return resolve
}

// creates a function that runs a named pack w/ cache (based heavily on
// createGetComponent from hypernova)
function createRunPacksCached (nameMap) {
  const { fetch, run } = createPackUtils(nameMap)

  const getPacks = keys(nameMap).reduce(async (memo, name) => {
    try {
      memo[name] = await fetch(name)
    } catch (err) {
      log.error(err.stack)
    }

    return memo
  }, {})

  async function getPack (name) {
    const packs = await getPacks
    return packs[name]
  }

  return async (name) => {
    const pack = await getPack(name)

    if (pack == null) {
      return null
    } else {
      return run(name, pack)
    }
  }
}

const isProd = process.env.NODE_ENV === 'production'
module.exports = isProd ? createRunPacksCached : createRunPacks
