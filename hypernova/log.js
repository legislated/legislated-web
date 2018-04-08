function parseArgs (args) {
  const name = args[0]
  const rest = Array.prototype.slice.call(args, 1)
  rest[0] = `hypernova[pack: ${name}] ${rest[0]}`
  return rest
}

function info () {
  console.log.apply(null, parseArgs(arguments))
}

function debug () {
  if (process.env.DEBUG) {
    console.log.apply(null, parseArgs(arguments))
  }
}

function error () {
  console.error.apply(null, parseArgs(arguments))
}

module.exports = { info, debug, error }
