const { ActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');

module.exports = {

  openFileEntry: fileinfo => {
    Dispatcher.dispatch({
      type: ActionTypes.OPEN_FILE_ENTRY,
      fileinfo: fileinfo
    });
  },

};
