#!/usr/bin/env node

var electron = require('./')

var proc = require('child_process')

var child = proc.spawn(electron, process.argv.slice(2), {stdio: 'inherit'})
child.on('close', function (code) {
  process.exit(code)
})

var forwardedSignals = ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGBREAK']
forwardedSignals.forEach(function(signal) {
  process.on(signal, function() { if (child) child.kill(signal); })
})

process.on('exit', function() { if (child) child.kill() })
