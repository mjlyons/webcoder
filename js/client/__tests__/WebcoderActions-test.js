jest.dontMock('js/client/Constants');
jest.dontMock('../WebcoderActions');

describe('WebcoderActions', () => {
  it('opeFileEntry action is dispatched', () => {
    const WebcoderActions = require('../WebcoderActions');
    const { FolderBrowserActionTypes } = require('js/client/Constants');
    const Dispatcher = require('js/client/Dispatcher');
    WebcoderActions.openFileEntry('fakefileinfo');
    expect(Dispatcher.dispatch).toBeCalledWith({
      type: FolderBrowserActionTypes.OPEN_FILE_ENTRY,
      fileinfo: 'fakefileinfo',
    });
  });
});
