#!/usr/bin/env node

var os = require('os')
var path = require('path')
var split = require('split')
var https = require('https')
var nugget = require('nugget')
var extract = require('extract-zip')
var fs = require('fs')

var platform = os.platform()

// 64-bit is not available under windows.
var arch = (platform == 'win32') ? 'ia32' : os.arch()

function getFiles(version) {

  console.log('Getting release information...')

  var name = [
    'atom-shell-', version, '-', platform, '-', arch, '.zip'
  ].join('')

  var url = [
    'https://github.com/atom/atom-shell/releases/download/', version, '/', name
  ].join('')

  var onerror = function(err) {
    throw err
  }

  var paths = {
    darwin: path.join(__dirname, './dist/Atom.app/Contents/MacOS/Atom'),
    linux: path.join(__dirname, './dist/atom'),
    win32: path.join(__dirname, './dist/atom.exe')
  }

  var shebang = {
    darwin: '#!/bin/bash\n',
    linux: '#!/bin/bash\n',
    win32: ''
  }

  var argv = {
    darwin: '"$@"',
    linux: '"$@"',
    win32: '%*' // does this work with " " in the args?
  }

  if (!paths[platform]) throw new Error('Unknown platform: '+platform)

  nugget(url, {target:name, dir:__dirname, resume:true, verbose:true}, function(err) {

    if (err) return onerror(err)

    fs.writeFileSync(
      path.join(__dirname, 'path.txt'),
      paths[platform]
    )

    fs.writeFileSync(
      path.join(__dirname, 'run.bat'),
      shebang[platform]+'"'+paths[platform]+'" '+argv[platform]
    )

    extract(path.join(__dirname, name), {dir:path.join(__dirname, 'dist')}, function(err) {
      if (err) return onerror(err)
    })
  })
}

var req = {
  'host': 'api.github.com',
  'path': '/repos/atom/atom-shell/tags',
  'headers': {
    'User-Agent': 'Node'
  }
}

https.get(req, function(res) {

  res
    .pipe(split())
    .on('data', function(d) {
      try { d = JSON.parse(d) }
      catch(ex) { console.error(ex.message) }
      getFiles(d[0].name)
    })
})

