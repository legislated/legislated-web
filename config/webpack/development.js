const path = require('path')
const merge = require('webpack-merge')
const RelayCompilerPlugin = require('@dhau/relay-compiler-webpack-plugin')
const { server, client: baseClient } = require('./universal')
const constants = require('./constants')

// create a client config to render all non-ssr bundles
const client = merge(baseClient, {
  devtool: 'sourcemap',
  devServer: {
    inline: true
  },
  plugins: [
    new RelayCompilerPlugin({
      src: path.resolve(constants.client, './src'),
      schema: path.resolve('./schema.json')
    })
  ]
})

module.exports = [
  server,
  client
]
