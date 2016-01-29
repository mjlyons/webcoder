const { ROOT_SOURCE_PATH } = require('settings')();
const { ls, fileFinderQuery, readfile, storefile } = require('../serverfs');
const path = require('path');
const express = require('express');
const router = express.Router();

function disableBrowserCache(res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
  res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
  res.setHeader('Expires', '0'); // Proxies.
}

function loggedInHtml(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

function loggedInJson(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ error: 'logged-out' });
  }
}

router.get('/', (req, res, _next) => {
  res.render('index.jade', {});
});

const clientHtmlPath = path.join(__dirname, '../../../static/client/client.html');
router.get('/editor', loggedInHtml, (req, res) => { res.sendFile(clientHtmlPath); });


// TODO(mike): test all ajax calls all enforce logged in
// TODO(mike): add logged out status to all ajax call responses
router.get('/ls/:path(*)', loggedInJson, function routeLs(req, res, _next) {
  disableBrowserCache(res);

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

// TODO(mike): integration-test this
router.get('/readfile/:path(*)', loggedInJson, (req, res, _next) => {
  disableBrowserCache(res);
  // TODO(mike): handle error cases
  const readfileResult = readfile(ROOT_SOURCE_PATH, req.params.path);
  res.json(readfileResult);
});

// TODO(mike): integration-test this
router.post('/storefile/:path(*)', loggedInJson, (req, res, _next) => {
  // TODO(mike): handle error cases
  const storefileResult = storefile(ROOT_SOURCE_PATH, req.params.path, req.body.contents);
  res.json(storefileResult);
});

// TODO(mike): integration-test this, make sure enforces logged in too
router.get('/filefinderquery/:query(*)', loggedInJson, (req, res, _next) => {
  disableBrowserCache(res);
  // TODO(mike): handle error cases
  const queryResult = fileFinderQuery(ROOT_SOURCE_PATH, req.params.query);
  res.json(queryResult);
});

module.exports = router;
