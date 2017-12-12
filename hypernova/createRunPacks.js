const { createVM } = require('hypernova/server')
const fetchPack = require('./fetchPack')

// runs a named pack and returns its component
function createRunPack (names) {
  const { run } = createVM({ cacheSize: names.length })

  return (name, pack) => {
    return run(name, pack).default
  }
}

// creates a function that runs a named pack w/ no cache
function createRunPacks (names) {
  const runPack = createRunPack(names)

  return async (name) => {
    const pack = await fetchPack(name)
    const Component = runPack(name, pack)
    return Component
  }
}

// creates a function that runs a named pack w/ cache (based heavily on
// createGetComponent from hypernova)
function createRunPacksCached (names) {
  const runPack = createRunPack(names)

  const getPacks = names.reduce(async (memo, name) => {
    try {
      const pack = await fetchPack(name)
      runPack(name, pack)
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
      return runPack(name, pack)
    }
  }
}

const isProd = process.env.NODE_ENV === 'production'
module.exports = isProd ? createRunPacksCached : createRunPacks
