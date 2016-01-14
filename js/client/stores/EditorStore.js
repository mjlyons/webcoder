const Store = require('js/client/stores/Store');
const Dispatcher = require('js/client/Dispatcher');
const Immutable = require('immutable');
const { FolderBrowserActionTypes } = require('js/client/Constants');
const { Filetypes } = require('js/common/FileEntry');

let _state = Immutable.Map({
  currentPath: null,
});

/**
 * Maintains the current state of the editor pane.
 * @todo add unit tests
 */

class EditorStore extends Store {
  constructor() { super(); }
  getState() { return _state; }
}

const storeInst = new EditorStore();
storeInst.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case FolderBrowserActionTypes.OPEN_FILE_ENTRY:
      if (action.fileinfo.filetype === Filetypes.FILE) {
        _state = _state.set('currentPath', action.fileinfo.path);
        storeInst.emitChange();
      }
      break;

    default:
  }
});

module.exports = storeInst;
