var BinWrapper = require('bin-wrapper');
var path = require('path');

var BIN;
var BIN_VERSION = '0.18.1';
var BASE_URL = [
  'https://github.com/atom/atom-shell/releases/download/v',
  BIN_VERSION + '/atom-shell-v' + BIN_VERSION
].join('');

if (process.platform === 'win32') BIN = 'atom.exe';
else if (process.platform === 'darwin') BIN = 'Atom.app/Contents/MacOS/Atom';
else BIN = 'atom';

var bin = new BinWrapper({strip: 0})
  .src(BASE_URL + '-darwin-x64.zip', 'darwin')
  .src(BASE_URL + '-linux-ia32.zip', 'linux', 'x86')
  .src(BASE_URL + '-linux-x64.zip', 'linux', 'x64')
  .src(BASE_URL + '-win32-ia32.zip', 'win32')
  .dest(path.join(__dirname, 'dist'))
  .use(BIN)
  .version(BIN_VERSION);

module.exports.bin = bin;
module.exports.path = bin.path();
module.exports.version = BIN_VERSION;
