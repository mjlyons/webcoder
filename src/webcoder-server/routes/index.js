"use strict";


let debug = require('debug')('webcoder-server:server');
let express = require('express');
let fs = require('fs');
let path = require('path');
let router = express.Router();

// TODO: make a localsettings.js file somewhere (and load it here?)
const ROOT_SOURCE_PATH = '/Users/mjlyons/Workspace/webcoder'

router.get('/ls/:path(*)', function(req, res, next) {
  // Disable caching on browser
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.

  // Get requested path
  // TODO: Make this a test (can't break out of ROOT_SOURCE_PATH)
  let reqPath = path.resolve(ROOT_SOURCE_PATH, (req.params.path || ''));
  if (!reqPath.startsWith(ROOT_SOURCE_PATH)) {
    console.error('Tried to use relative path to escape ROOT_SOURCE_PATH');
    res.render('error', {message: 'Not authorized', error: {status: 403}});
    return;
  }
  debug(`reqPath: ${reqPath}`);
  let childFilenames = fs.readdirSync(reqPath);

  let contents = {}
  for (let childFilename of childFilenames) {
    let childPath = path.join(reqPath, childFilename);
    debug(childPath);
    let stats = fs.statSync(childPath);
    let typeDesc = 'unknown';
    if (stats.isFile()) {
      typeDesc = 'file';
    } else if (stats.isDirectory()) {
      typeDesc = 'dir';
    }
    contents[childFilename] = {'type': typeDesc};
  }

  // Canned data
  let dirJson = {
    'path': reqPath,
    'contents': contents,
  };

  res.json(dirJson);
});


module.exports = router;
