const { createVM } = require('hypernova/server')
const fetchPack = require('./fetchPack')
const { keys } = Object

function createPackUtils (nameMap) {
  const { run: runPack } = createVM({
    cacheSize: keys(nameMap).length
  })

  return {
    fetch (name) {
      return fetchPack(nameMap[name])
    },
    run (name, pack) {
      return runPack(name, pack).default
    },
    async resolve (name) {
      const pack = await this.fetch(name)
      return this.run(name, pack)
    }
  }
}

// creates a function that runs a named pack w/ no cache
function createRunPacks (nameMap) {
  const { resolve } = createPackUtils(nameMap)
  return resolve
}

// creates a function that runs a named pack w/ cache (based heavily on
// createGetComponent from hypernova)
function createRunPacksCached (nameMap) {
  const { run, resolve } = createPackUtils(nameMap)

  const getPacks = keys(nameMap).reduce(async (memo, name) => {
    try {
      const pack = await resolve(name)
      memo[name] = pack
    } catch (err) {
      console.error(err.stack)
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
