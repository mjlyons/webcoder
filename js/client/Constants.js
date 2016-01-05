module.exports = {

  // TODO(mike): rename this to FolderBrowserActionTypes
  ActionTypes: {
    OPEN_FILE_ENTRY: Symbol('OPEN_FILE_ENTRY'),
  },

  AlertActionTypes: {
    SHOW_ALERT: Symbol('SHOW_ALERT'),
  },

  FolderStates: {
    DOES_NOT_EXIST: Symbol('DOES_NOT_EXIST'),
    NOT_AUTHORIZED: Symbol('NOT_AUTHORIZED'),
    NOT_CACHED: Symbol('NOT_CACHED'),
    CACHED: Symbol('CACHED'),
  },

};
