jest.dontMock('js/client/Constants');

describe('AlertStore', () => {
  it('shows alert for five seconds', () => {
    const { AlertActionTypes } = require.requireActual('js/client/Constants');
    const Dispatcher = require('js/client/Dispatcher');
    const AlertStore = require.requireActual('../AlertStore');
    const Store = require('js/client/stores/Store');
    expect(Dispatcher.register).toBeCalled();
    const actionHandler = Dispatcher.register.mock.calls[0][0];
    expect(AlertStore.get().get('message')).toEqual(null);

    // Test initial "show alert" updates store with message
    actionHandler({ type: AlertActionTypes.SHOW_ALERT, message: 'mymessage' });
    expect(Store.prototype.emitChange).toBeCalled();
    expect(AlertStore.get().get('message')).toEqual('mymessage');

    // Test alert goes away after a few seconds
    expect(setTimeout).toBeCalled();
    expect(setTimeout.mock.calls[0][1]).toEqual(5000);
    const hideAlertCallback = setTimeout.mock.calls[0][0];
    Store.prototype.emitChange.mockClear();
    hideAlertCallback();
    expect(Store.prototype.emitChange).toBeCalled();
    expect(AlertStore.get().get('message')).toEqual(null);
  });
});
