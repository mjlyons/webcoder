import { Record } from 'immutable';
import path from 'path';

const Filetypes = {
  FILE: 'FILE',
  FOLDER: 'FOLDER',
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
