const { AlertActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');

module.exports = {

  showAlert: message => {
    Dispatcher.dispatch({
      type: AlertActionTypes.SHOW_ALERT,
      message,
    });
  },

};
