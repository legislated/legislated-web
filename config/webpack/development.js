const webpack = require('webpack')
const merge = require('webpack-merge')
const shared = require('./shared')

const config = merge(shared, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENVIRONMENT': JSON.stringify('development')
      }
    })
  ]
})

module.exports = config
