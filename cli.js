#!/usr/bin/env node
var spawn = require('child_process').spawn;

spawn(require('./').path, process.argv.slice(2), { stdio: 'inherit' })
  .on('exit', process.exit);
