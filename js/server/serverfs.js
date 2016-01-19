const fs = require('fs'); // TODO(mike): use fswrap so we can test
const path = require('path');
const fuzzy = require('fuzzy');

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

// TODO(mike): unit test storefile
function storefile(rootPath, reqPath, contents) {
  // TODO(mike): Should probably merge this with the ls code (very similar)
  const fullPath = path.resolve(rootPath, reqPath);
  if (!fullPath.startsWith(rootPath)) {
    return { error: 'not-authorized' };
  }
//  if (!fs.existsSync(fullPath)) {
//    return { error: 'not-exists' };
//  }

  // TODO(mike): Should probably check/test if trying to save over a folder, etc.
//  if (!fs.statSync(fullPath).isFile()) {
//    return { error: 'not-file' };
//  }

  fs.writeFileSync(fullPath, contents, 'utf8');

  return {
    path: '/' + reqPath,
  };
}

// TODO(mike): should probably be smarter about parallelizing this
// TODO(mike): invalidate cache when a file is added/moved/removed
const filePathCache = [];
const IGNORE = ['node_modules', 'build', '.git'];  // TODO(mike): expose this in localsettings.js
function _recScanDir(rootPath, currPath) {
  const folderContents = fs.readdirSync(currPath);
  for (const entry of folderContents) {
    if (IGNORE.indexOf(entry) !== -1) {
      continue;
    }
    const entryPath = path.join(currPath, entry);
    let entryStat;
    try {
      entryStat = fs.statSync(entryPath);
    } catch (ex) {
      continue;
    }

    if (entryStat.isFile()) {
      filePathCache.push(entryPath.substr(rootPath.length));
    } else if (entryStat.isDirectory()) {
      _recScanDir(rootPath, entryPath);
    }
  }
}
function getFileList(rootPath) {
  if (filePathCache.length === 0) {
    _recScanDir(rootPath, rootPath);
  }
  return filePathCache;
}

// TODO(mike): unit test this
const FILE_FINDER_QUERY_MAX_RESULTS = 10;
function fileFinderQuery(rootPath, query) {
  // Get list of files in FS
  // TODO(mike): cache list
  const pathList = getFileList(rootPath);
  const formattedResults = fuzzy.filter(query, pathList);


  // TODO(mike): don't hide fuzzy bolding
  const results = formattedResults.slice(0, FILE_FINDER_QUERY_MAX_RESULTS).map(formattedResult => {
    return formattedResult.string;
  });
  return {
    query,
    results,
  };
}

module.exports = { fileFinderQuery, readfile, storefile };
