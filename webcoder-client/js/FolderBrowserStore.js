const { EventEmitter } = require('events');

const { ActionTypes } = require('js/Constants');
const Dispatcher = require('js/Dispatcher');
const { Filetypes } = require('js/FileEntry');

const CHANGE_EVENT = 'change';

// TODO(mike): This should be immutable?
const _data = {
  currentPath: '/',
};

const FolderBrowserStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT);
  },

  get: function() {
    return _data;
  }

});

FolderBrowserStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {

    case ActionTypes.OPEN_FILE_ENTRY:
      console.log(`FolderBrowserStore:OPEN_FILE_ENTRY: ${action.fileinfo.path}`);
      if (action.fileinfo.filetype === Filetypes.FOLDER) {
        _data.currentPath = action.fileinfo.path;
        FolderBrowserStore.emitChange();
      }
      break;

  }
});

module.exports = FolderBrowserStore;
