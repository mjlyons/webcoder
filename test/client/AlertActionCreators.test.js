const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const expect = chai.expect;

const { AlertActionTypes } = require('js/client/Constants');

describe('AlertActionCreators', () => {
  it('showAlert action is dispatched', () => {
    const dispatchSpy = sinon.spy();
    const AlertActionCreators = proxyquire('js/client/AlertActionCreators', {
      'js/client/Dispatcher': { dispatch: dispatchSpy },
    });
    AlertActionCreators.showAlert('myalert');
    expect(dispatchSpy).to.have.been.calledWith({
      type: AlertActionTypes.SHOW_ALERT,
      message: 'myalert',
    });
  });
});
