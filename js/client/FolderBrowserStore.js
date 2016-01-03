const { EventEmitter } = require('events');

const { ActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');
const { Filetypes } = require('js/common/FileEntry');

const CHANGE_EVENT = 'change';

// TODO(mike): This should be immutable?
const _data = {
  currentPath: '/',
};

const FolderBrowserStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: () => {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: callback => {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: callback => {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: () => {
    return _data;
  },

});

FolderBrowserStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case ActionTypes.OPEN_FILE_ENTRY:
      if (action.fileinfo.filetype === Filetypes.FOLDER) {
        _data.currentPath = action.fileinfo.path;
        FolderBrowserStore.emitChange();
      }
      break;

    default:
      // Do nothing
      break;

  }
});

module.exports = FolderBrowserStore;
