const Store = require('js/client/stores/Store');
const Dispatcher = require('js/client/Dispatcher');
const { ActionTypes } = require('js/client/Constants');
const { Filetypes } = require('js/common/FileEntry');


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
  console.log('FBS:1');
  switch (action.type) {

    case ActionTypes.OPEN_FILE_ENTRY:
      console.log('FBS:2');
      if (action.fileinfo.filetype === Filetypes.FOLDER) {
        console.log('FBS:3');
        _state.currentPath = action.fileinfo.path;
        storeInst.emitChange();
      }
      break;

    default:
      return;
  }
});

module.exports = storeInst;
