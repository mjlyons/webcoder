const Store = require('js/client/stores/Store');
const Dispatcher = require('js/client/Dispatcher');
const { FolderBrowserActionTypes } = require('js/client/Constants');
const { Filetypes } = require('js/common/FileEntry');
const Immutable = require('immutable');

let _state = Immutable.Map({
  currentPath: '/',
});

class FolderBrowserStore extends Store {
  constructor() { super(); }
  getState() { return _state; }
}

const storeInst = new FolderBrowserStore();
storeInst.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case FolderBrowserActionTypes.OPEN_FILE_ENTRY:
      if (action.fileinfo.filetype === Filetypes.FOLDER) {
        _state = _state.set('currentPath', action.fileinfo.path);
        storeInst.emitChange();
      }
      break;

    default:
      return;
  }
});

module.exports = storeInst;
