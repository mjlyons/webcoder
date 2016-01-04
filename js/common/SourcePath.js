// Returns the parent path for the supplied source path.
// Note that it returns the parent path with a trailing seperator (/).
function getParentPath(sourcePath) {
  if (sourcePath === '/') {
    return null;
  }
  return sourcePath.match(/(.*\/).+\/*$/)[1];
}

module.exports = {
  getParentPath,
};
