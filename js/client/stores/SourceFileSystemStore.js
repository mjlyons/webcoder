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

const READFILE_NETWORK_ERROR_MESSAGE = 'Error reading file from server';
const READFILE_FORBIDDEN_ERROR_MESSAGE = "You don't have access to that file";
const READFILE_NOT_FOUND_ERROR_MESSAGE = "Couldn't find that file";
const READFILE_NOT_FILE_ERROR_MESSAGE = "That isn't a file";
const READFILE_SERVER_ERROR_MESSAGE = 'The source server had an error while examining the file';

const SERVER_FILETYPE_TO_CLIENT_FILETYPE = {
  dir: Filetypes.FOLDER,
  file: Filetypes.FILE,
};

// TODO(mike): Unit test readfile

let _state = Immutable.fromJS({
  filesystem: {},
  fileContents: {},
});

function _getFolderContents(folderPath) {
  return _state.getIn(['filesystem', folderPath], null);
}

function _getFileContents(filePath) {
  return _state.getIn(['fileContents', filePath], null);
}

class SourceFileSystemStore extends Store {
  constructor() { super(); }
  getState() { return _state; }
  getFolderContents(folderPath) { return _getFolderContents(folderPath); }
  getFileContents(filePath) { return _getFileContents(filePath); }
}
const storeInst = new SourceFileSystemStore();

// TODO(mike): the ls and readfile functions are very similar, can they be merged?

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
  _state = _state.setIn(['filesystem', jsonResponse.path], Immutable.List(contents));
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

function _handleServerReadfileResponse(response) {
  const statusToError = {
    403: READFILE_FORBIDDEN_ERROR_MESSAGE,
    404: READFILE_NOT_FOUND_ERROR_MESSAGE,
    405: READFILE_NOT_FILE_ERROR_MESSAGE,
    500: READFILE_SERVER_ERROR_MESSAGE,
  };
  if (response.status in statusToError) {
    AlertActionCreators.showAlert(statusToError[response.status]);
    return;
  }

  const jsonResponse = JSON.parse(response.responseText);
  _state = _state.setIn(['fileContents', jsonResponse.path], jsonResponse.fileContents);
  storeInst.emitChange();
}

function _updateFileContents(requestedPath) {
  const req = new XMLHttpRequestWrap();
  req.addEventListener('load', function onLoad() {
    _handleServerReadfileResponse(this);
  });
  req.addEventListener('error', function onError() {
    AlertActionCreators.showAlert(READFILE_NETWORK_ERROR_MESSAGE);
  });
  req.open('GET', `${settings.SERVER_HOST}/readfile${requestedPath}`);
  req.send();
}

SourceFileSystemStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case FolderBrowserActionTypes.OPEN_FILE_ENTRY:
      if (action.fileinfo.filetype === Filetypes.FOLDER) {
        _updateFolderContents(action.fileinfo.path);
      } else if (action.fileinfo.filetype === Filetypes.FILE) {
        _updateFileContents(action.fileinfo.path);
      }
      break;

    default:
      // Do nothing
      break;

  }
});

module.exports = storeInst;
