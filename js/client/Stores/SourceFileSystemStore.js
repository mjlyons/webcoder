const localsettings = require('localsettings')();
const path = require('path');

const Store = require('js/client/stores/Store');
const AlertActionCreators = require('js/client/AlertActionCreators');
const { ActionTypes, FolderStates } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');
const { Filetypes } = require('js/common/FileEntry');
const XMLHttpRequestWrap = require('js/client/XMLHttpRequestWrap');

const LS_NETWORK_ERROR_MESSAGE = 'Error getting folder contents from server';
const LS_FORBIDDEN_ERROR_MESSAGE = "You don't have access to that folder";
const LS_NOT_FOUND_ERROR_MESSAGE = "Couldn't find that folder";
const LS_NOT_FOLDER_ERROR_MESSAGE = "That isn't a folder";
const LS_SERVER_ERROR_MESSAGE = 'The source server had an error while examining the folder';

const SERVER_FILETYPE_TO_CLIENT_FILETYPE = {
  dir: Filetypes.FOLDER,
  file: Filetypes.FILE,
};

// TODO(mike): This should be immutable?
const _state = {
  folderContents: {},
};

function _getFolderContents(folderPath) {
  if (folderPath in _state.folderContents) {
    return {
      state: FolderStates.CACHED,
      contents: _state.folderContents[folderPath],
    };
  }
  return {
    state: FolderStates.NOT_CACHED,
    contents: [],
  };
}

class SourceFileSystemStore extends Store {
  constructor() { super(); }
  get() { return _state; }
  getAllFolderContents() { return _state.folderContents; }
  getFolderContents(folderPath) { return _getFolderContents(folderPath); }
}
const storeInst = new SourceFileSystemStore();

function _handleServerLsResponse(response) {
  const statusToError = {
    403: LS_FORBIDDEN_ERROR_MESSAGE,
    404: LS_NOT_FOUND_ERROR_MESSAGE,
    405: LS_NOT_FOLDER_ERROR_MESSAGE,
    500: LS_SERVER_ERROR_MESSAGE,
  };
  if (response.status in statusToError) {
    AlertActionCreators.showAlert(statusToError[response.status]);
    return;
  }

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
  _state.folderContents[jsonResponse.path] = contents;
  storeInst.emitChange();
}

function _updateFolderContents(requestedPath) {
  const req = new XMLHttpRequestWrap();
  req.addEventListener('load', function onLoad() {
    _handleServerLsResponse(this);
  });
  req.addEventListener('error', function onError() {
    AlertActionCreators.showAlert(LS_NETWORK_ERROR_MESSAGE);
  });
  req.open('GET', `${localsettings.SERVER_HOST}/ls${requestedPath}`);
  req.send();
}

SourceFileSystemStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case ActionTypes.OPEN_FILE_ENTRY:
      if (action.fileinfo.filetype === Filetypes.FOLDER) {
        _updateFolderContents(action.fileinfo.path);
      }
      break;

    default:
      // Do nothing
      break;

  }
});

module.exports = storeInst;
