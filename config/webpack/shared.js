const { environment } = require('@rails/webpacker')

const merge = require('webpack-merge')
const path = require('path')
const RelayCompilerPlugin = require('relay-compiler-webpack-plugin')
const webpack = require('webpack')

const client = './app/javascript'
const config = merge(environment.toWebpackConfig(), {
  resolve: {
    alias: {
      shared: path.resolve(client, './src/shared')
    }
  },
  plugins: [
    new RelayCompilerPlugin({
      src: path.resolve(client, './src'),
      schema: path.resolve('./schema.json')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
})

module.exports = config
