"use strict";

const { ROOT_SOURCE_PATH } = require('../localsettings');

import { ls_to_json } from "../ls.js";

let test_dict = {'x': 1};
const { x } = test_dict;

let express = require('express');
let path = require('path');
let router = express.Router();

router.get('/ls/:path(*)', function(req, res, next) {
  // Disable caching on browser
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.

  let lsJson = ls_to_json(ROOT_SOURCE_PATH, req.params.path);
  if (lsJson.error === 'not-authorized') {
    res.render('error', {message: 'Not authorized', error: {status: 403}});
  } else {
    res.json(lsJson);
  }
});


module.exports = router;
