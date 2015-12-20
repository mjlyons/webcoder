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
  debug(`fullPath: ${fullPath}`);
  const childFilenames = fs.readdirSync(fullPath);

  const contents = {};
  for (const childFilename of childFilenames) {
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
