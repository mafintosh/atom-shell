var fs = require('fs')
var path = require('path')

var binaryPath = fs.readFileSync(path.join(__dirname, 'path.txt'), 'utf-8').trim()
module.exports = path.join(__dirname, binaryPath)
