const { Record } = require('immutable');
const path = require('path');

// TODO(mike): create a class for fileinfo
const Filetypes = {
  FILE: Symbol('FILE'),
  FOLDER: Symbol('FOLDER'),
};

const _fileEntryDefaults = {
  filetype: null,
  path: null,
};

class FileEntry extends Record(_fileEntryDefaults) {
  toString() {
    return `${this.path} - ${this.filetype.toString()}`;
  }

  get filename() {
    const basename = path.basename(this.path);
    if (basename === '') {
      return '/';
    }
    return basename;
  }
}

module.exports = {
  FileEntry,
  Filetypes,
};
