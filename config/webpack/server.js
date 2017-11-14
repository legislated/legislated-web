const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const shared = require('./development')

const config = merge(shared, {
  target: 'node',
  externals: [
    nodeExternals()
  ],
  output: {
    library: 'app',
    libraryTarget: 'commonjs2'
  }
})

module.exports = config
