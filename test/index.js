var tape = require('tape')
var electron = require('../')
var path = require('path')
var pathExists = require('path-exists')
var getHomePath = require('home-path')()
var execFile = require('child_process').execFile

tape('set ELECTRON_ENV to development if not defined', function (t) {
  var args = [__dirname + '/../cli.js', __dirname + '/fixture/index.js']
  execFile('node', args, function (err, stdout, stderr) {
    if (err) {
      return t.end(err)
    }
    t.equal(stdout.toString().trim(), 'development')
    t.end()
  })
})

tape('inherits ELECTRON_ENV from parent process is defined', function (t) {
  var args = [__dirname + '/../cli.js', __dirname + '/fixture/index.js']
  process.env.ELECTRON_ENV = 'testing'
  execFile('node', args, function (err, stdout, stderr) {
    if (err) {
      return t.end(err)
    }

    t.equal(stdout.toString().trim(), 'testing')
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
