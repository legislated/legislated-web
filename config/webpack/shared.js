require('./mapEnv')

const { environment } = require('@rails/webpacker')

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const constants = require('./constants')

const config = merge(environment.toWebpackConfig(), {
  resolve: {
    alias: {
      shared: path.resolve(constants.client, './src/shared')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENVIRONMENT': JSON.stringify(process.env.WEBPACK_ENV)
      }
    })
  ]
})

module.exports = config
