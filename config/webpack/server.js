const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const ManifestPlugin = require('@rails/webpacker/node_modules/webpack-manifest-plugin')
const { pick, omit } = require('lodash')
const shared = require('./development')

// remove the manifest plugin
const index = shared.plugins
  .findIndex((plugin) => plugin.constructor === ManifestPlugin)

shared.plugins.splice(index, 1)

// builds a config that replaces entries / plugins properly
function config (additions) {
  const merger = merge.strategy({
    entry: 'replace'
  })

  return merger(shared, additions)
}

// creates a manifest plugin instance for multi-compiler builds
const seed = {}
const manifestPlugin = () => new ManifestPlugin({
  seed,
  publicPath: shared.output.publicPath,
  writeToFileEmit: true
})

// create a server config to only render the ssr bundle
const server = config({
  target: 'node',
  devtool: false,
  entry: pick(shared.entry, [
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
    manifestPlugin()
  ]
})

// create a client config to render all non-ssr bundles
const client = config({
  entry: omit(shared.entry, [
    'server'
  ]),
  plugins: [
    manifestPlugin()
  ]
})

module.exports = [
  server,
  client
]
