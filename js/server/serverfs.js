const fs = require('fs'); // TODO(mike): use fswrap so we can test
const path = require('path');

// TODO(mike): rename fs to serverfs module, merge readfile and ls in
// TODO(mike): unit test readfile
function readfile(rootPath, reqPath = '') {
  // TODO(mike): Should probably merge this with the ls code (very similar)
  const fullPath = path.resolve(rootPath, reqPath);
  if (!fullPath.startsWith(rootPath)) {
    return { error: 'not-authorized' };
  }
  if (!fs.existsSync(fullPath)) {
    return { error: 'not-exists' };
  }
  if (!fs.statSync(fullPath).isFile()) {
    return { error: 'not-file' };
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return {
    path: '/' + reqPath,
    fileContents,
  };
}

module.exports = { readfile };