var fs = require('fs')
var path = require('path')
var packageJson = require('./package.json')

module.exports = {
  path: path.join(__dirname, fs.readFileSync(path.join(__dirname, 'path.txt'), 'utf-8')),
  version: packageJson.version
}
