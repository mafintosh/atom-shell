var tape = require('tape')
var atom = require('../').path;
var fs = require('fs')

tape('has binary', function(t) {
  t.ok(fs.existsSync(atom), 'atom-shell was downloaded')
  t.end()
})
