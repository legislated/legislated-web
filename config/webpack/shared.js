require('./mapEnv')

const { environment } = require('@rails/webpacker')

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const constants = require('./constants')

function config (preprocess) {
  if (preprocess) {
    preprocess(environment)
  }

  return merge(environment.toWebpackConfig(), {
    resolve: {
      alias: {
        shared: path.resolve(constants.client, './src/shared')
      }
    }
  })
}

function environmentPlugin (value) {
  return new webpack.DefinePlugin({
    'process.env': {
      'ENVIRONMENT': JSON.stringify(value)
    }
  })
}

module.exports = {
  config,
  environmentPlugin
}
