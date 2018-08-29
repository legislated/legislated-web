const webpack = require('webpack')
const $merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const ManifestPlugin = require('webpack-manifest-plugin')
const { pick, omit } = require('lodash')
const base = require('./shared')
const { assign } = Object
const { stringify } = JSON

// env plugin
const env = {
  IS_SERVER: null,
  GRAPH_URL: stringify(process.env.LEGISLATED_GRAPH_URL)
}

const envPlugin = (extras) => new webpack.DefinePlugin({
  'process.env': assign({}, env, extras)
})

// manifest plugin
const seed = {}
const manifestPlugin = () => new ManifestPlugin({
  seed,
  publicPath: base.output.publicPath,
  writeToFileEmit: true
})

// builds a config that replaces entries / plugins properly
const merge = $merge.strategy({
  entry: 'replace'
})

// create a server config to only render the ssr bundle
const server = merge(base, {
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
    envPlugin({
      IS_SERVER: 'true'
    }),
    manifestPlugin()
  ]
})

// create a client config to render all non-ssr bundles
const client = merge(base, {
  entry: omit(base.entry, [
    'server'
  ]),
  plugins: [
    envPlugin(),
    manifestPlugin()
  ]
})

module.exports = {
  server,
  client
}
