import { ActionTypes } from 'js/client/Constants';

const MESSAGE_DURATION_MSEC = 2000;

let pendingHideAlert = null;

function _setAlert(message) {
  return {
    type: ActionTypes.SHOW_ALERT,
    message,
  };
}

function _clearAlert() {
  return {
    type: ActionTypes.CLEAR_ALERT,
  };
}

function showAlert(message) {
  return (dispatch) => {
    console.log('in inner!');
    // Display message now
    dispatch(_setAlert(message));
    if (!!pendingHideAlert) {
      clearTimeout(pendingHideAlert);
    }

    // Hide message after n seconds
    pendingHideAlert = setTimeout(() => {
      pendingHideAlert = null;
      dispatch(_clearAlert());
    }, MESSAGE_DURATION_MSEC);
  };
}

module.exports = {
  showAlert,
};
