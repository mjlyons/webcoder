const { EventEmitter } = require('events');
const path = require('path');

const { ActionTypes, FolderStates } = require('js/Constants');
const Dispatcher = require('js/Dispatcher');
const { Filetypes } = require('js/FileEntry');

const CHANGE_EVENT = 'change';

const SERVER_FILETYPE_TO_CLIENT_FILETYPE = {
  dir: Filetypes.FOLDER,
  file: Filetypes.FILE,
};


// TODO(mike): This should be immutable?
const _pathContents = {};

const SourceFileSystemStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT);
  },

  updateFolderContents: function(path) {
    console.log(`SourceFileSystemStore:updateFolderContents: ${path}`);
    const req = new XMLHttpRequest();
    // TODO(mike): handle error (both on HTTP and in response)
    const _this = this;
    req.addEventListener('load', function() {
      //console.log(`response: ${this.responseText}`);
      _this.handleServerLsResponse(this);
    });
    req.addEventListener('error', function() {
      // TODO(mike): implement
      console.error("Error making /ls request");
    });
    req.open("GET", `http://webcoder:3000/ls${path}`);  // TODO(mike): parameterize path
    req.send();
  },

  handleServerLsResponse: function (response) {
    // TODO(mike): handle 403, 404, 500
    const jsonResponse = JSON.parse(response.responseText);
    const contents = [];
    // TODO(mike): This should use a proper classA
    for (const serverFileName in jsonResponse.contents) {
      const serverFileInfo = jsonResponse.contents[serverFileName];
      contents.push({
        filetype: SERVER_FILETYPE_TO_CLIENT_FILETYPE[serverFileInfo.type],
        filename: serverFileName,
        path: path.resolve(jsonResponse.path, serverFileName),
      });
    }
    _pathContents[jsonResponse.path] = contents;
    this.emitChange();
  },

  getFolderContents: function(path) {
    // TODO: query server if doesn't exist
    if (path in _pathContents) {
      return {
        state: FolderStates.CACHED,
        contents: _pathContents[path],
      };
    } else {  // TODO(mike): handle 404, 403, is-a-file
      return {
        state: FolderStates.NOT_CACHED,
        contents: [],
      };
    }
  }

});

SourceFileSystemStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {

    case ActionTypes.OPEN_FILE_ENTRY:
      if (action.fileinfo.filetype === Filetypes.FOLDER) {
        SourceFileSystemStore.updateFolderContents(action.fileinfo.path);
      }
      break;

  }
});

module.exports = SourceFileSystemStore;

