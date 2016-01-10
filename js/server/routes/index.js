const { ROOT_SOURCE_PATH } = require('localsettings')();
const ls = require('../ls');

const express = require('express');
const router = express.Router();

router.get('/ls/:path(*)', function routeLs(req, res, _next) {
  // Disable caching on browser
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
  res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
  res.setHeader('Expires', '0'); // Proxies.

  const lsJson = ls(ROOT_SOURCE_PATH, req.params.path);
  if (lsJson.error === 'not-authorized') {
    res.status(403).render('error', { message: 'Not authorized', error: { status: 403 } });
  } else if (lsJson.error === 'not-exists') {
    res.status(404).render('error', { message: 'Not found', error: { status: 404 } });
  } else if (lsJson.error === 'not-dir') {
    res.status(405).render('error', { message: 'Not allowed (not a folder)', error: { status: 405 } });
  } else {
    res.json(lsJson);
  }
});


module.exports = router;
