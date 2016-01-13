const Store = require('js/client/stores/Store');
const { AlertActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');
const Immutable = require('immutable');

const MESSAGE_TIME_MSEC = 5000;

let _state = Immutable.Map({
  message: null,
});

let _messageTimeout = null;

class AlertStore extends Store {
  constructor() { super(); }
  getState() { return _state; }
}
const storeInst = new AlertStore();

function _changeMessage(newMessage) {
  _state = _state.set('message', newMessage);
  storeInst.emitChange();
}

AlertStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {
    case AlertActionTypes.SHOW_ALERT:
      _changeMessage(action.message);

      // Remove message after a delay
      if (_messageTimeout) {
        clearTimeout(_messageTimeout);
        _messageTimeout = null;
      }
      _messageTimeout = setTimeout(() => _changeMessage(null), MESSAGE_TIME_MSEC);
      break;

    default:
  }
});

module.exports = storeInst;
