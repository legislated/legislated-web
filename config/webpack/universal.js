const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const ManifestPlugin = require('webpack-manifest-plugin')
const { pick, omit } = require('lodash')
const base = require('./shared')

// shared plugins
const environmentPlugin = (value) => new webpack.DefinePlugin({
  'process.env': {
    'ENVIRONMENT': JSON.stringify(value)
  }
})

const seed = {}
const manifestPlugin = () => new ManifestPlugin({
  seed,
  publicPath: base.output.publicPath,
  writeToFileEmit: true
})

// builds a config that replaces entries / plugins properly
const merge2 = merge.strategy({
  entry: 'replace'
})

// create a server config to only render the ssr bundle
const server = merge2(base, {
  target: 'node',
  devtool: false,
  entry: pick(base.entry, [
    'server'
  ]),
  externals: [
    nodeExternals()
  ],
  output: {
    library: 'app',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    environmentPlugin('server'),
    manifestPlugin()
  ]
})

// create a client config to render all non-ssr bundles
const client = merge2(base, {
  entry: omit(base.entry, [
    'server'
  ]),
  plugins: [
    environmentPlugin(process.env.RAILS_ENV),
    manifestPlugin()
  ]
})

module.exports = {
  server,
  client
}
