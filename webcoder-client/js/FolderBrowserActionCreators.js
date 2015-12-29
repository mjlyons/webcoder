const { ActionTypes } = require('js/Constants');
const Dispatcher = require('js/Dispatcher');

module.exports = {

  openFileEntry: fileinfo => {
    Dispatcher.dispatch({
      type: ActionTypes.OPEN_FILE_ENTRY,
      fileinfo: fileinfo
    });
  },

};
