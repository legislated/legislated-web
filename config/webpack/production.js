const merge = require('webpack-merge')
const { config, environmentPlugin } = require('./shared')

const production = merge(config(), {
  plugins: [
    environmentPlugin('production')
  ]
})

module.exports = production
