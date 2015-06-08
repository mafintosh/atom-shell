#!/usr/bin/env node

// maintainer note - update this manually when doing new releases:

var fs = require('fs');
var path = require('path');

var extract = require('extract-zip');
var download = require('electron-download');

// default config
var config = { version : '0.27.3' };

// Try to load a custom electron config
try { version = require('rc')('electron-prebuild', config); } catch (e) { }

function onerror (err) {
  throw err;
}

// downloads if not cached
download(config, extractFile);

// unzips and makes path.txt point at the correct executable
function extractFile (err, zipPath) {
  if (err) return onerror(err);
  extract(zipPath, {dir: path.join(__dirname, 'dist')}, function (err) {
    if (err) return onerror(err);
  });
}
