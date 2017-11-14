const map = {
  server: 'development'
}

// store actual env in WEBPACK_ENV and update NODE_ENV to be on of
// webpacker's three bless-ed envs
const env = process.env.NODE_ENV
process.env.WEBPACK_ENV = env
process.env.NODE_ENV = map[env] || env
