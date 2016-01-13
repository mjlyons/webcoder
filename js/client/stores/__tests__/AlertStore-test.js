jest.dontMock('js/client/Constants');
jest.dontMock('../AlertStore');

describe('AlertStore', () => {
  let AlertActionTypes = null;
  let Dispatcher = null;
  let Store = null;

  beforeEach(() => {
    ({ AlertActionTypes } = require.requireActual('js/client/Constants'));
    Dispatcher = require('js/client/Dispatcher');
    Store = require('js/client/stores/Store');
  });

  it('shows alert for five seconds', () => {
    const AlertStore = require.requireActual('../AlertStore');
    expect(Dispatcher.register).toBeCalled();
    const actionHandler = Dispatcher.register.mock.calls[0][0];
    expect(AlertStore.getState().get('message')).toEqual(null);

    // Test initial "show alert" updates store with message
    actionHandler({ type: AlertActionTypes.SHOW_ALERT, message: 'mymessage' });
    expect(Store.prototype.emitChange).toBeCalled();
    expect(AlertStore.getState().get('message')).toEqual('mymessage');

    // Test alert goes away after a few seconds
    expect(setTimeout).toBeCalled();
    expect(setTimeout.mock.calls[0][1]).toEqual(5000);
    const hideAlertCallback = setTimeout.mock.calls[0][0];
    Store.prototype.emitChange.mockClear();
    hideAlertCallback();
    expect(Store.prototype.emitChange).toBeCalled();
    expect(AlertStore.getState().get('message')).toEqual(null);
  });
  it('drops the first alert if it gets another', () => {
    const AlertStore = require.requireActual('../AlertStore');
    const actionHandler = Dispatcher.register.mock.calls[0][0];

    // Set the message, verify it sets the timeout
    actionHandler({ type: AlertActionTypes.SHOW_ALERT, message: 'message1' });
    expect(Store.prototype.emitChange).toBeCalled();
    expect(AlertStore.getState().get('message')).toEqual('message1');
    expect(setTimeout).toBeCalled();
    expect(setTimeout.mock.calls[0][1]).toEqual(5000);
    const hideAlertCallback1 = setTimeout.mock.calls[0][0];
    Store.prototype.emitChange.mockClear();

    // Set the message again, make sure the first timeout is cleared
    actionHandler({ type: AlertActionTypes.SHOW_ALERT, message: 'message2' });
    expect(Store.prototype.emitChange).toBeCalled();
    expect(clearTimeout).toBeCalledWith(hideAlertCallback1);
    expect(AlertStore.getState().get('message')).toEqual('message2');
    expect(setTimeout).toBeCalled();
    expect(setTimeout.mock.calls[1][1]).toEqual(5000);
    const hideAlertCallback2 = setTimeout.mock.calls[1][0];
    Store.prototype.emitChange.mockClear();

    // Make sure the message is cleared after delay
    hideAlertCallback2();
    expect(Store.prototype.emitChange).toBeCalled();
    expect(AlertStore.getState().get('message')).toEqual(null);
  });
});
