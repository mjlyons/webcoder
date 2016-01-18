const { WebcoderActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');

module.exports = {

  openFileEntry: fileinfo => {
    Dispatcher.dispatch({
      type: WebcoderActionTypes.OPEN_FILE_ENTRY,
      fileinfo,
    });
  },

  saveFile: (filepath, contents) => {
    Dispatcher.dispatch({
      type: WebcoderActionTypes.SAVE_FILE,
      filepath,
      contents,
    });
  },

};
