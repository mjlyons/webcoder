const debug = require('debug')('webcoder-server:server');
const fs = require('fs');
const path = require('path');

export function ls_to_json(rootPath, reqPath='') {
  // Get requested path
  // TODO: Make this a test (use /, ..) (can't break out of ROOT_SOURCE_PATH)
  let fullPath = path.resolve(rootPath, reqPath);
  if (!fullPath.startsWith(rootPath)) {
    return {error: 'not-authorized'};
  }
  debug(`fullPath: ${fullPath}`);
  let childFilenames = fs.readdirSync(fullPath);

  let contents = {}
  for (let childFilename of childFilenames) {
    let childPath = path.join(fullPath, childFilename);
    debug(childPath);
    let stats = fs.statSync(childPath);
    let typeDesc = 'unknown';
    if (stats.isFile()) {
      typeDesc = 'file';
    } else if (stats.isDirectory()) {
      typeDesc = 'dir';
    }
    contents[childFilename] = {'type': typeDesc};
  };
  return {
    'path': fullPath,
    'contents': contents,
  };
}
