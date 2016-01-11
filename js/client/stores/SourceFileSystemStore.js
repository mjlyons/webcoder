const settings = require('settings')();
const path = require('path');

const Store = require('js/client/stores/Store');
const AlertActionCreators = require('js/client/AlertActionCreators');
const { FolderBrowserActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');
const { FileEntry, Filetypes } = require('js/common/FileEntry');
const XMLHttpRequestWrap = require('js/client/XMLHttpRequestWrap');
const Immutable = require('immutable');

const LS_NETWORK_ERROR_MESSAGE = 'Error getting folder contents from server';
const LS_FORBIDDEN_ERROR_MESSAGE = "You don't have access to that folder";
const LS_NOT_FOUND_ERROR_MESSAGE = "Couldn't find that folder";
const LS_NOT_FOLDER_ERROR_MESSAGE = "That isn't a folder";
const LS_SERVER_ERROR_MESSAGE = 'The source server had an error while examining the folder';

const SERVER_FILETYPE_TO_CLIENT_FILETYPE = {
  dir: Filetypes.FOLDER,
  file: Filetypes.FILE,
};

let _state = Immutable.Map({});

function _getFolderContents(folderPath) {
  return _state.get(folderPath, null);
}

class SourceFileSystemStore extends Store {
  constructor() { super(); }
  getState() { return _state; }
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
  for (const serverFileName in jsonResponse.contents) {
    if ({}.hasOwnProperty.call(jsonResponse.contents, serverFileName)) {
      const serverFileInfo = jsonResponse.contents[serverFileName];
      contents.push(new FileEntry({
        filetype: SERVER_FILETYPE_TO_CLIENT_FILETYPE[serverFileInfo.type],
        path: path.resolve(jsonResponse.path, serverFileName),
      }));
    }
  }
  _state = _state.set(jsonResponse.path, Immutable.List(contents));
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
  req.open('GET', `${settings.SERVER_HOST}/ls${requestedPath}`);
  req.send();
}

SourceFileSystemStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case FolderBrowserActionTypes.OPEN_FILE_ENTRY:
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
