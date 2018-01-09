require('./mapEnv')

const { environment } = require('@rails/webpacker')
const { resolve } = require('path')
const merge = require('webpack-merge')
const constants = require('./constants')

// blow away the built-in manifest plugin so that it can be customized
environment.plugins.delete('Manifest')

const base = merge(environment.toWebpackConfig(), {
  resolve: {
    alias: {
      '@': resolve(constants.client, './src/shared')
    }
  }
})

console.log(base)

module.exports = base
