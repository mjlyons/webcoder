"use strict";

// This file builds up a jest config with all the js files
// to analyze coverage information about. Doing this manually
// since there seems to be a bug in Jest that doesn't
// analyze all .js files by default.

const fs = require('fs');
const path = require('path');

// Read .jestrc as json object`
const jestrcJson = JSON.parse(fs.readFileSync('./.jestrc'));

// Find list of non-test .js files in js/
const jsFilesToCover = {};
function scanFiles(scanPath) {
  if (fs.statSync(scanPath).isDirectory()) {
    const childFilenames = fs.readdirSync(scanPath);
    for (const childFilename of childFilenames) {
      scanFiles(path.resolve(scanPath, childFilename));
    }
  } else {
    if (scanPath.endsWith('.js') && scanPath.indexOf('__tests__') === -1) {
      jsFilesToCover[scanPath] = true;
    }
  }
}
scanFiles('./js');

// Add to .jestrc object
jestrcJson.collectCoverage = true;
jestrcJson.collectCoverageOnlyFrom = jsFilesToCover;

// write object to .jestcovrc
fs.writeFileSync('./.jestcovrc', JSON.stringify(jestrcJson));
