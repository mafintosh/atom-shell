var tape = require('tape')
var electron = require('../')
var path = require('path')
var pathExists = require('path-exists')
var getHomePath = require('home-path')()
var packageJson = require('../package.json')

tape('has local binary', function (t) {
  t.ok(pathExists.sync(electron.path), 'electron was downloaded')
  t.end()
})

tape('has cache folder', function (t) {
  t.ok(pathExists.sync(path.join(getHomePath, './.electron')), 'cache exists')
  t.end()
})

tape('gives electron version', function (t) {
  t.ok(electron.version === packageJson.version, 'gives correct version')
  t.end()
})
