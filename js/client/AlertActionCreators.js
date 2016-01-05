const { AlertActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');

module.exports = {

  showAlert: message => {
    // TODO(mike): Write a unit test for this
    Dispatcher.dispatch({
      type: AlertActionTypes.SHOW_ALERT,
      message,
    });
  },

};
