const path = require('path')
const fs = require('fs')
const http = require('http')
const concat = require('concat-stream')

// pull paths out of the webpack config
const env = process.env.NODE_ENV || 'development'
const config = require(path.resolve(`./config/webpack`, env))[0]
const { devServer, output } = config
const { path: packsPath } = output

// pack helpers
function requireManifest () {
  return require(path.resolve(packsPath, 'manifest.json'))
}

function packNameFromManifest (manifest, name) {
  return manifest[`${name}.js`]
}

// require branches
function fetchPackFromDevServer ({ host, port }) {
  const devServerUrl = `http://${host}:${port}`

  return async (name) => {
    const packFile = packNameFromManifest(requireManifest(), name)
    const url = `${devServerUrl}${packFile}`

    return new Promise((resolve, reject) => {
      http.get(url, (res) => {
        res.setEncoding('utf8')
        res.pipe(concat({ encoding: 'string' }, (data) => {
          resolve(data)
        }))
      })
    })
  }
}

function fetchPackFromFileSystem () {
  const manifest = requireManifest()

  return async (name) => {
    // both packsPath and packFIle have a leading slash
    const packFile = packNameFromManifest(manifest, name)
    const filePath = path.join(packsPath, '..', packFile)

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (error, data) => {
        if (data) {
          resolve(data)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = devServer ? fetchPackFromDevServer(devServer) : fetchPackFromFileSystem()
