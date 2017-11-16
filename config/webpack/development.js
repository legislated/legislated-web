const path = require('path')
const merge = require('webpack-merge')
const RelayCompilerPlugin = require('@dhau/relay-compiler-webpack-plugin')
const shared = require('./shared')
const constants = require('./constants')

const config = merge(shared, {
  plugins: [
    new RelayCompilerPlugin({
      src: path.resolve(constants.client, './src'),
      schema: path.resolve('./schema.json')
    })
  ]
})

module.exports = config
