const Store = require('js/client/Stores/Store');
const Dispatcher = require('js/client/Dispatcher');
const { ActionTypes } = require('js/client/Constants');
const { Filetypes } = require('js/common/FileEntry');


// TODO(mike): Test this
// TODO(mike): Make this immutable
const _state = {
  currentPath: '/',
};

class FolderBrowserStore extends Store {

  constructor() {
    super();
  }

  get() {
    return _state;
  }

}

const storeInst = new FolderBrowserStore();
storeInst.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case ActionTypes.OPEN_FILE_ENTRY:
      if (action.fileinfo.filetype === Filetypes.FOLDER) {
        _state.currentPath = action.fileinfo.path;
        storeInst.emitChange();
      }
      break;

    default:
      return;
  }
});

module.exports = storeInst;
