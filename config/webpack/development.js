const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const RelayCompilerPlugin = require('@dhau/relay-compiler-webpack-plugin')
const ManifestPlugin = require('@rails/webpacker/node_modules/webpack-manifest-plugin')
const { pick, omit } = require('lodash')
const { config, environmentPlugin } = require('./shared')
const constants = require('./constants')

// destroy original manifest plugin
function preprocess ({ plugins }) {
  plugins.delete('Manifest')
}

const base = merge(config(preprocess), {
  plugins: [
    new RelayCompilerPlugin({
      src: path.resolve(constants.client, './src'),
      schema: path.resolve('./schema.json')
    })
  ]
})

// builds multi-compiler manifest plugin
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
  devtool: 'sourcemap',
  devServer: {
    inline: true
  },
  entry: omit(base.entry, [
    'server'
  ]),
  plugins: [
    environmentPlugin('development'),
    manifestPlugin()
  ]
})

module.exports = [
  server,
  client
]
