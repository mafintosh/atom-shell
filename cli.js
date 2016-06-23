#!/usr/bin/env node

var electron = require('./')

var proc = require('child_process')

var child = proc.spawn(electron, process.argv.slice(2))
child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)
child.on('close', function (code) {
  process.exit(code)
})
