#!/usr/bin/env node

var electron = require('./')

var proc = require('child_process')

var env = process.env
env.ELECTRON_ENV = env.ELECTRON_ENV || 'development'

var child = proc.spawn(electron, process.argv.slice(2), {stdio: 'inherit'})
child.on('close', function (code) {
  process.exit(code)
})
