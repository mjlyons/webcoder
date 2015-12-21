const fs = require('./fswrap');
const path = require('path');

module.exports = function ls(rootPath, reqPath = '') {
  // Get requested path
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
  // TODO/ES6: Switch to for...of (jest chokes on babel-polyfill)
  // for (const childFilename of childFilenames) {
  for (let childIndex = 0; childIndex < childFilenames.length; childIndex += 1) {
    const childFilename = childFilenames[childIndex];
    const childPath = path.join(fullPath, childFilename);
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
