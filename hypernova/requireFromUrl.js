const http = require('http')
const concat = require('concat-stream')

// helpers
async function requireFromUrl (url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.setEncoding('utf8')
      res.pipe(concat({ encoding: 'string' }, (data) => {
        resolve(data)
      }))
    })
  })
}

module.exports = requireFromUrl
