jest.dontMock('js/client/Constants');
jest.dontMock('../AlertActionCreators');

describe('AlertActionCreators', () => {
  it('showAlert action is dispatched', () => {
    const AlertActionCreators = require('../AlertActionCreators');
    const { AlertActionTypes } = require('js/client/Constants');
    const Dispatcher = require('js/client/Dispatcher');
    AlertActionCreators.showAlert('myalert');
    expect(Dispatcher.dispatch).toBeCalledWith({
      type: AlertActionTypes.SHOW_ALERT,
      message: 'myalert',
    });
  });
});
