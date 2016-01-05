const { EventEmitter } = require('events');
const localsettings = require('localsettings')();
const path = require('path');

const AlertActionCreators = require('js/client/AlertActionCreators');
const { ActionTypes, FolderStates } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');
const { Filetypes } = require('js/common/FileEntry');

const CHANGE_EVENT = 'change';

const LS_NETWORK_ERROR_MESSAGE = 'Error getting folder contents from server';

const SERVER_FILETYPE_TO_CLIENT_FILETYPE = {
  dir: Filetypes.FOLDER,
  file: Filetypes.FILE,
};


// TODO(mike): This should be immutable?
const _pathContents = {};

const SourceFileSystemStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  updateFolderContents: function updateFolderContents(requestedPath) {
    const req = new XMLHttpRequest();
    // TODO(mike): handle error (both on HTTP and in response)
    const _this = this;
    req.addEventListener('load', function onLoad() {
      _this.handleServerLsResponse(this);
    });
    req.addEventListener('error', function onError() {
      // TODO(mike): test this case
      AlertActionCreators.showAlert(LS_NETWORK_ERROR_MESSAGE);
    });
    req.open('GET', `${localsettings.SERVER_HOST}/ls${requestedPath}`);
    req.send();
  },

  handleServerLsResponse: function handleServerLsResponse(response) {
    // TODO(mike): handle 403, 404, 500
    const jsonResponse = JSON.parse(response.responseText);
    const contents = [];
    // TODO(mike): This should use a proper class
    for (const serverFileName in jsonResponse.contents) {
      if ({}.hasOwnProperty.call(jsonResponse.contents, serverFileName)) {  // TODO(mike): Maybe I can do this better with immutablejs
        const serverFileInfo = jsonResponse.contents[serverFileName];
        contents.push({
          filetype: SERVER_FILETYPE_TO_CLIENT_FILETYPE[serverFileInfo.type],
          filename: serverFileName,
          path: path.resolve(jsonResponse.path, serverFileName),
        });
      }
    }
    _pathContents[jsonResponse.path] = contents;
    this.emitChange();
  },

  getFolderContents: function getFolderContents(requestedPath) {
    // TODO: query server if doesn't exist
    if (requestedPath in _pathContents) {
      return {
        state: FolderStates.CACHED,
        contents: _pathContents[requestedPath],
      };
    } // TODO(mike): handle 404, 403, is-a-file
    return {
      state: FolderStates.NOT_CACHED,
      contents: [],
    };
  },

});

SourceFileSystemStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case ActionTypes.OPEN_FILE_ENTRY:
      if (action.fileinfo.filetype === Filetypes.FOLDER) {
        SourceFileSystemStore.updateFolderContents(action.fileinfo.path);
      }
      break;

    default:
      // Do nothing
      break;

  }
});

module.exports = SourceFileSystemStore;
