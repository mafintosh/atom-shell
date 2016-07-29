var tape = require('tape')
var electron = require('../')
var path = require('path')
var pathExists = require('path-exists')
var getHomePath = require('home-path')()
var spawnSync = require('child_process').spawnSync

tape('set ELECTRON_ENV to development if not defined', function (t) {
  var args = [__dirname + '/fixture/index.js']
  var result = spawnSync(__dirname + '/../cli.js', args).stdout.toString()
  t.equal(result, 'development\n')
  t.end()
})

tape('inherits ELECTRON_ENV from parent process is defined', function (t) {
  var args = [__dirname + '/fixture/index.js']
  process.env.ELECTRON_ENV = 'testing'
  var result = spawnSync(__dirname + '/../cli.js', args).stdout.toString()
  t.equal(result, 'testing\n')
  t.end()
})

tape('has local binary', function (t) {
  t.ok(pathExists.sync(electron), 'electron was downloaded')
  t.end()
})

tape('has cache folder', function (t) {
  t.ok(pathExists.sync(path.join(getHomePath, './.electron')), 'cache exists')
  t.end()
})
