// This wraps the fs module - it's used so it can be mocked out for integration
// tests where the fs module may be used for other unrelated purposes.
const fs = require('fs');

function readdirSync(...funcArgs) {
  return fs.readdirSync(...funcArgs);
}

function existsSync(...funcArgs) {
  return fs.existsSync(...funcArgs);
}

function statSync(...funcArgs) {
  return fs.statSync(...funcArgs);
}

function readFileSync(...funcArgs) {
  return fs.readFileSync(...funcArgs);
}

function writeFileSync(...funcArgs) {
  return fs.writeFileSync(...funcArgs);
}

module.exports = { readdirSync, existsSync, statSync, readFileSync, writeFileSync };
