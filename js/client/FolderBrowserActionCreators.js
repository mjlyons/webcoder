const { FolderBrowserActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');

module.exports = {

  openFileEntry: fileinfo => {
    Dispatcher.dispatch({
      type: FolderBrowserActionTypes.OPEN_FILE_ENTRY,
      fileinfo,
    });
  },

};
