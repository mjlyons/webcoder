const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const expect = chai.expect;

const { WebcoderActionTypes } = require('js/client/Constants');

describe('WebcoderActions', () => {
  it('showAlert action is dispatched', () => {
    const dispatchSpy = sinon.spy();
    const WebcoderActions = proxyquire('js/client/WebcoderActions', {
      'js/client/Dispatcher': { dispatch: dispatchSpy },
    });
    WebcoderActions.openFileEntry('fakefileinfo');
    expect(dispatchSpy).to.have.been.calledWith({
      type: WebcoderActionTypes.OPEN_FILE_ENTRY,
      fileinfo: 'fakefileinfo',
    });
  });
});
