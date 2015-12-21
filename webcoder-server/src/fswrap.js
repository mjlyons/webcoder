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
