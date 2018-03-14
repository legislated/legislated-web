const merge = require('webpack-merge')
const { server, client: $client } = require('./universal')

// create a client config to render all non-ssr bundles
const client = merge($client, {
  devtool: 'sourcemap',
  devServer: {
    inline: true
  }
})

module.exports = [
  server,
  client
]
