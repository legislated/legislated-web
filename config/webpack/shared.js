require('./mapEnv')

const { environment } = require('@rails/webpacker')

const path = require('path')
const merge = require('webpack-merge')
const constants = require('./constants')

// blow away the built-in manifest plugin so that it can be customized
environment.plugins.delete('Manifest')

const base = merge(environment.toWebpackConfig(), {
  resolve: {
    alias: {
      shared: path.resolve(constants.client, './src/shared')
    }
  }
})

module.exports = base
