var tape = require('tape')
var electron = require('../')
var path = require('path')
var pathExists = require('path-exists')
var getHomePath = require('home-path')()
var execFile = require('child_process').execFile

tape('set ELECTRON_ENV to development if not defined', function (t) {
  var args = [__dirname + '/fixture/index.js']
  execFile(__dirname + '/../cli.js', args, function (err, stdout) {
    t.equal(stdout.toString(), 'development\n')
    t.end()
  })
})

tape('inherits ELECTRON_ENV from parent process is defined', function (t) {
  var args = [__dirname + '/fixture/index.js']
  process.env.ELECTRON_ENV = 'testing'
  execFile(__dirname + '/../cli.js', args, function (err, stdout) {
    t.equal(stdout.toString(), 'testing\n')
    t.end()
  })
})

tape('has local binary', function (t) {
  t.ok(pathExists.sync(electron), 'electron was downloaded')
  t.end()
})

tape('has cache folder', function (t) {
  t.ok(pathExists.sync(path.join(getHomePath, './.electron')), 'cache exists')
  t.end()
})
