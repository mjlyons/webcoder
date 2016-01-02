// This wraps the fs module - it's used so it can be mocked out for integration
// tests where the fs module may be used for other unrelated purposes.
const fs = require('fs');

function readdirSync(path) {
  return fs.readdirSync(path);
}

function existsSync(path) {
  return fs.existsSync(path);
}

function statSync(path) {
  return fs.statSync(path);
}

module.exports = { readdirSync, existsSync, statSync };
