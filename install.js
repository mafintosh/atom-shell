#!/usr/bin/env node

// maintainer note - x.y.z-ab version in package.json -> x.y.z
var version = require('./package').version.replace(/-.*/, '');

var fs = require('fs');
var os = require('os');
var path = require('path');
var extract = require('extract-zip');
var findProjectRoot = require('find-project-root');
var download = require('electron-download');


var nodeRootdir = findProjectRoot(process.cwd(), {
    maxDepth: 12
});

var installedVersion = null;
try {
    installedVersion = fs.readFileSync(path.join(__dirname, 'dist', 'version'), 'utf-8').replace(/^v/, '')
} catch (err) {
    // do nothing
}

var platform = os.platform();

function onerror(err) {
    throw err
}

var paths = {
    darwin: 'dist/Electron.app/Contents/MacOS/Electron',
    freebsd: 'dist/electron',
    linux: 'dist/electron',
    win32: 'dist/electron.exe'
};

if (!paths[platform]) throw new Error('Unknown platform: ' + platform);

if (installedVersion === version && fs.existsSync(path.join(__dirname, paths[platform]))) {
    process.exit(0);
}


// get the properties

function getProperties() {
    try {
        var manifest = require(path.join(nodeRootdir, "package.json"));
    } catch (e) {
    }


    var inf = (manifest && manifest['electron-prebuilt']) ? manifest['electron-prebuilt'] : {};

    var arch = inf.arch || process.env.npm_config_arch;
    var strictSSL = inf.strict_ssl || process.env.npm_config_strict_ssl;
    var version = inf.version || version;


    return {
        'version': version,
        'arch': arch,
        'strictSSL': strictSSL
    };

}


// get the properties
oProperties = getProperties();

// downloads if not cached
download({
    version: oProperties.version,
    arch: oProperties.arch,
    strictSSL: oProperties.strictSSL
}, extractFile);

// unzips and makes path.txt point at the correct executable
function extractFile(err, zipPath) {
    if (err) {
        return onerror(err);
    }
    fs.writeFile(path.join(__dirname, 'path.txt'), paths[platform], function (err) {
        if (err) return onerror(err);
        extract(zipPath, {dir: path.join(__dirname, 'dist')}, function (err) {
            if (err) return onerror(err)
        })
    })
}
