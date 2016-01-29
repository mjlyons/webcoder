const fs = require('js/server/fswrap'); // TODO(mike): use fswrap so we can test
const path = require('path');
const fuzzy = require('fuzzy');
const settings = require('settings')();

/**
 * Returns a json object with information about files in the requested directory
 *
 * In successful case, returns:
 * {
 *   path: <string> absolute path of requested directory
 *   contents: {
 *     [filename1]: { type: <string> "file"|"dir" }
 *     [filename2]: ...
 *   }
 * }
 *
 * If there was an error, returns { error: <string> description } where description is:
 * - not-authorized (path was outside the rootPath)
 * - not-exists (path does not exist)
 * - not-dir (path is not a directory - maybe it's a file)
 */
function ls(rootPath, reqPath = '') {
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
    'path': '/' + reqPath,
    contents,
  };
}

// TODO(mike): rename fs to serverfs module, merge readfile and ls in
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

// Fast filename search (FFS) cache: List of the fuzzy-inputs ("extension:filename:path") -> path
const ffsFuzzyInputsCache = [];

//  FFS: Map {fuzzy-input -> path} to determine path of a found result
const ffsFuzzyInputsToMapCache = {};

function _recScanDir(rootPath, currPath) {
  const folderContents = fs.readdirSync(currPath);
  for (const entry of folderContents) {
    if (!!settings.IGNORE_FILE_ENTRIES && settings.IGNORE_FILE_ENTRIES.indexOf(entry) !== -1) {
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
      const entryExt = path.extname(entry).toLowerCase();
      if (settings.FAST_FILENAME_SEARCH_EXTENSIONS &&
          settings.FAST_FILENAME_SEARCH_EXTENSIONS.indexOf(entryExt) === -1) {
        continue;
      }
      const serverPath = entryPath.substr(rootPath.length);
      const searchEntry = `${entryExt}:${entry}:${serverPath}`;
      ffsFuzzyInputsCache.push(searchEntry);
      ffsFuzzyInputsToMapCache[searchEntry] = serverPath;
    } else if (entryStat.isDirectory()) {
      _recScanDir(rootPath, entryPath);
    }
  }
}
function getFileList(rootPath) {
  if (ffsFuzzyInputsCache.length === 0) {
    _recScanDir(rootPath, rootPath);
  }
  return ffsFuzzyInputsCache;
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
    return ffsFuzzyInputsToMapCache[formattedResult.string];
  });
  return {
    query,
    results,
  };
}

module.exports = { ls, fileFinderQuery, readfile, storefile };
