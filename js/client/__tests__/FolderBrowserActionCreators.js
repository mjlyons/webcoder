jest.dontMock('js/client/Constants');
jest.dontMock('../FolderBrowserActionCreators');

describe('FolderBrowserActionCreators', () => {
  it('opeFileEntry action is dispatched', () => {
    const FolderBrowserActionCreators = require('../FolderBrowserActionCreators');
    const { ActionTypes } = require('js/client/Constants');
    const Dispatcher = require('js/client/Dispatcher');
    FolderBrowserActionCreators.openFileEntry('fakefileinfo');
    expect(Dispatcher.dispatch).toBeCalledWith({
      type: ActionTypes.OPEN_FILE_ENTRY,
      fileinfo: 'fakefileinfo',
    });
  });
});
