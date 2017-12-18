const path = require('path')
const fs = require('fs')
const http = require('http')
const concat = require('concat-stream')

// pull paths out of the webpack config
const env = process.env.NODE_ENV || 'development'
const config = require(path.resolve(`./config/webpack`, env))[0]
const { devServer, output } = config
const { path: packsPath } = output

// development
function fetchPackFromDevServer ({ host, port }) {
  const devServerUrl = `http://${host}:${port}`

  return async (name) => {
    const manifest = await loadManifest()
    const packFile = packNameFromManifest(manifest, name)
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

// production
function fetchPackFromFileSystem () {
  const manifest = loadManifest()

  return async (name) => {
    // both packsPath and packPath have a leading slash
    const packPath = packNameFromManifest(await manifest, name)
    const filePath = path.join(packsPath, '..', packPath)
    const pack = await readFile(filePath)

    return pack
  }
}

// helpers
async function loadManifest () {
  const manifestPath = path.resolve(packsPath, 'manifest.json')
  const manifest = await readFile(manifestPath)
  return JSON.parse(manifest)
}

function packNameFromManifest (manifest, name) {
  return manifest[`${name}.js`]
}

function readFile (filePath) {
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

module.exports = devServer ? fetchPackFromDevServer(devServer) : fetchPackFromFileSystem()
