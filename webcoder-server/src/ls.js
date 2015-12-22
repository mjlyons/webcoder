const fs = require('./fswrap');
const path = require('path');

// Returns a json object with information about files in the requested
// directory
//
// In successful case, returns:
// {
//   path: <string> absolute path of requested directory
//   contents: {
//     [filename1]: { type: <string> "file"|"dir" }
//     [filename2]: ...
//   }
// }
//
// If there was an error, returns { error: <string> description } where description is:
// - not-authorized (path was outside the rootPath)
// - not-exists (path does not exist)
// - not-dir (path is not a directory - maybe it's a file)
module.exports = function ls(rootPath, reqPath = '') {
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
  for (const childFilename of childFilenames) {
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
