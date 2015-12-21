const debug = require('debug')('webcoder-server:server');
const fs = require('fs');
const path = require('path');

module.exports = function ls(rootPath, reqPath = '') {
  // Get requested path
  // TODO: Make this a test (use /, ..) (can't break out of ROOT_SOURCE_PATH)
  const fullPath = path.resolve(rootPath, reqPath);
  if (!fullPath.startsWith(rootPath)) {
    return { error: 'not-authorized' };
  }
  if (!fs.existsSync(fullPath)) {
    return { error: 'not-exists' };
  }
  if (!fs.statSync(fullPath).isDirectory()) {
    return { error: 'not-dir' };
  }
  const childFilenames = fs.readdirSync(fullPath);

  const contents = {};
  // ES6-TODO: Switch to for...of (jest chokes on babel-polyfill)
  // for (const childFilename of childFilenames) {
  for (let childIndex = 0; childIndex < childFilenames.length; childIndex += 1) {
    const childFilename = childFilenames[childIndex];
    const childPath = path.join(fullPath, childFilename);
    debug(childPath);
    const stats = fs.statSync(childPath);
    let typeDesc = 'unknown';
    if (stats.isFile()) {
      typeDesc = 'file';
    } else if (stats.isDirectory()) {
      typeDesc = 'dir';
    }
    contents[childFilename] = { 'type': typeDesc };
  }
  return {
    'path': fullPath,
    contents,
  };
};
