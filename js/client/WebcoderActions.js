const { WebcoderActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');

module.exports = {

  /**
   * Loads a file or folder from the server
   */
  openFileEntry: fileinfo => {
    Dispatcher.dispatch({
      type: WebcoderActionTypes.OPEN_FILE_ENTRY,
      fileinfo,
    });
  },

  /**
   * Saves the file on the server
   */
  saveFile: (filepath, contents) => {
    Dispatcher.dispatch({
      type: WebcoderActionTypes.SAVE_FILE,
      filepath,
      contents,
    });
  },

  /**
   * Displays the file finder
   */
  showFileFinder: () => {
    Dispatcher.dispatch({ type: WebcoderActionTypes.SHOW_FILE_FINDER });
  },

  /**
   * Removes the file finder
   */
  hideFileFinder: () => {
    Dispatcher.dispatch({ type: WebcoderActionTypes.HIDE_FILE_FINDER });
  },

  /**
   * The file finder query has changed, update results
   */
  updateFileFinderQuery: query => {
    Dispatcher.dispatch({
      type: WebcoderActionTypes.UPDATE_FILE_FINDER_QUERY,
      query,
    });
  },
};
