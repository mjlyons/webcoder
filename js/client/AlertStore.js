const { EventEmitter } = require('events');
const { AlertActionTypes } = require('js/client/Constants');
const Dispatcher = require('js/client/Dispatcher');

const CHANGE_EVENT = 'change';

const MESSAGE_TIME_MSEC = 5000;

// TODO(mike): Make this immutable?
let _message = null;
let _messageTimeout = null;

// TODO(mike): Write unit test that dispatches a SHOW_ALERT,
//     verify it gettables the message, emits change,
//     then after a delay removes the message and emits change.

const AlertStore = Object.assign({}, EventEmitter.prototype, {

  // TODO(mike): There's a lot of duplicate code between the stores...merge.
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getMessage: function getMessage() {
    return _message;
  },

});

function _changeMessage(newMessage) {
  _message = newMessage;
  AlertStore.emitChange();
}

AlertStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case AlertActionTypes.SHOW_ALERT:
      _changeMessage(action.message);

      // Remove message after a delay
      if (!!_messageTimeout) {
        clearTimeout(_messageTimeout);
        _messageTimeout = null;
      }
      _messageTimeout = setTimeout(() => _changeMessage(null), MESSAGE_TIME_MSEC);
      break;

    default:
      // Do nothing
      break;

  }
});

module.exports = AlertStore;
